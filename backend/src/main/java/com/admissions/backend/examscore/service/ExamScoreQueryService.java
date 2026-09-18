package com.admissions.backend.examscore.service;

import com.admissions.backend.examscore.dto.CandidateLookupResponse;
import com.admissions.backend.examscore.dto.RankPositionResponse;
import com.admissions.backend.examscore.dto.ScoreDistributionResponse;
import com.admissions.backend.examscore.dto.SubjectGroupScoreDto;
import com.admissions.backend.examscore.entity.CandidateExamScore;
import com.admissions.backend.examscore.entity.ScoreDistributionSummary;
import com.admissions.backend.examscore.repository.CandidateExamScoreRepository;
import com.admissions.backend.examscore.repository.ScoreDistributionSummaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExamScoreQueryService {

    private final CandidateExamScoreRepository candidateExamScoreRepository;
    private final ScoreDistributionSummaryRepository scoreDistributionSummaryRepository;

    // Định nghĩa các tổ hợp môn phổ biến
    private static final List<GroupDef> POPULAR_GROUPS = List.of(
            new GroupDef("A00", "Toán, Vật lí, Hóa học", "Toán - Lý - Hóa", List.of("math", "physics", "chemistry")),
            new GroupDef("A01", "Toán, Vật lí, Ngoại ngữ", "Toán - Lý - Anh", List.of("math", "physics", "foreign_language")),
            new GroupDef("A02", "Toán, Vật lí, Sinh học", "Toán - Lý - Sinh", List.of("math", "physics", "biology")),
            new GroupDef("B00", "Toán, Hóa học, Sinh học", "Toán - Hóa - Sinh", List.of("math", "chemistry", "biology")),
            new GroupDef("B08", "Toán, Sinh học, Ngoại ngữ", "Toán - Sinh - Anh", List.of("math", "biology", "foreign_language")),
            new GroupDef("C00", "Ngữ văn, Lịch sử, Địa lí", "Văn - Sử - Địa", List.of("literature", "history", "geography")),
            new GroupDef("C01", "Ngữ văn, Toán, Vật lí", "Văn - Toán - Lý", List.of("literature", "math", "physics")),
            new GroupDef("D01", "Ngữ văn, Toán, Ngoại ngữ", "Văn - Toán - Anh", List.of("literature", "math", "foreign_language")),
            new GroupDef("D07", "Toán, Hóa học, Ngoại ngữ", "Toán - Hóa - Anh", List.of("math", "chemistry", "foreign_language")),
            new GroupDef("X01", "Toán, Tin học, Ngoại ngữ", "Toán - Tin - Anh", List.of("math", "informatics", "foreign_language")),
            new GroupDef("X02", "Toán, Công nghệ, Vật lí", "Toán - CN - Lý", List.of("math", "technology", "physics"))
    );

    private record GroupDef(String code, String name, String subjects, List<String> requiredCols) {}

    /**
     * Tra cứu điểm thi của thí sinh theo SBD và tính sẵn thứ hạng cho từng tổ hợp
     */
    @Transactional(readOnly = true)
    public CandidateLookupResponse lookupCandidateScore(short year, String sbd) {
        String cleanSbd = sbd.trim();
        CandidateExamScore candidate = candidateExamScoreRepository.findByYearAndSbd(year, cleanSbd)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy kết quả thi của SBD " + cleanSbd + " trong năm " + year));

        Map<String, BigDecimal> subjectScores = new LinkedHashMap<>();
        if (candidate.getMath() != null) subjectScores.put("Toán", candidate.getMath());
        if (candidate.getLiterature() != null) subjectScores.put("Ngữ văn", candidate.getLiterature());
        if (candidate.getPhysics() != null) subjectScores.put("Vật lí", candidate.getPhysics());
        if (candidate.getChemistry() != null) subjectScores.put("Hóa học", candidate.getChemistry());
        if (candidate.getBiology() != null) subjectScores.put("Sinh học", candidate.getBiology());
        if (candidate.getHistory() != null) subjectScores.put("Lịch sử", candidate.getHistory());
        if (candidate.getGeography() != null) subjectScores.put("Địa lí", candidate.getGeography());
        if (candidate.getEconomicLegal() != null) subjectScores.put("GD Kinh tế & Pháp luật", candidate.getEconomicLegal());
        if (candidate.getInformatics() != null) subjectScores.put("Tin học", candidate.getInformatics());
        if (candidate.getTechnology() != null) subjectScores.put("Công nghệ", candidate.getTechnology());
        if (candidate.getForeignLanguage() != null) subjectScores.put("Ngoại ngữ", candidate.getForeignLanguage());

        // Tính điểm cho các tổ hợp hợp lệ
        List<SubjectGroupScoreDto> groupScores = new ArrayList<>();

        for (GroupDef g : POPULAR_GROUPS) {
            BigDecimal total = calculateTotal(candidate, g.requiredCols());
            if (total != null) {
                SubjectGroupScoreDto dto = SubjectGroupScoreDto.builder()
                        .groupCode(g.code())
                        .groupName(g.name())
                        .subjects(g.subjects())
                        .totalScore(total)
                        .build();

                // Lấy thứ hạng Toàn quốc
                scoreDistributionSummaryRepository.findByExactScore(year, g.code(), "NATIONAL", "ALL", total)
                        .ifPresent(s -> {
                            dto.setNationalRank(s.getRankStart());
                            dto.setNationalHigherCount(s.getHigherCount());
                            dto.setNationalTotal(s.getTotalCandidates());
                            dto.setNationalPercentile(s.getPercentile());
                        });

                // Lấy thứ hạng Vùng miền
                scoreDistributionSummaryRepository.findByExactScore(year, g.code(), "REGION", candidate.getRegion(), total)
                        .ifPresent(s -> {
                            dto.setRegionRank(s.getRankStart());
                            dto.setRegionHigherCount(s.getHigherCount());
                            dto.setRegionTotal(s.getTotalCandidates());
                        });

                // Lấy thứ hạng Tỉnh thành
                scoreDistributionSummaryRepository.findByExactScore(year, g.code(), "PROVINCE", candidate.getProvince(), total)
                        .ifPresent(s -> {
                            dto.setProvinceRank(s.getRankStart());
                            dto.setProvinceHigherCount(s.getHigherCount());
                            dto.setProvinceTotal(s.getTotalCandidates());
                        });

                groupScores.add(dto);
            }
        }

        return CandidateLookupResponse.builder()
                .year(year)
                .sbd(cleanSbd)
                .province(candidate.getProvince())
                .region(candidate.getRegion())
                .subjectScores(subjectScores)
                .groupScores(groupScores)
                .build();
    }

    private BigDecimal calculateTotal(CandidateExamScore c, List<String> requiredCols) {
        BigDecimal sum = BigDecimal.ZERO;
        for (String col : requiredCols) {
            BigDecimal val = switch (col) {
                case "math" -> c.getMath();
                case "literature" -> c.getLiterature();
                case "physics" -> c.getPhysics();
                case "chemistry" -> c.getChemistry();
                case "biology" -> c.getBiology();
                case "history" -> c.getHistory();
                case "geography" -> c.getGeography();
                case "economic_legal" -> c.getEconomicLegal();
                case "informatics" -> c.getInformatics();
                case "technology" -> c.getTechnology();
                case "foreign_language" -> c.getForeignLanguage();
                default -> null;
            };
            if (val == null) return null;
            sum = sum.add(val);
        }
        return sum.setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Lấy dữ liệu phổ điểm và thống kê tổng hợp (0.5ms response time)
     */
    @Transactional(readOnly = true)
    public ScoreDistributionResponse getScoreDistribution(short year, String targetCode, String scopeType, String scopeCode) {
        String cleanTargetCode = targetCode.toUpperCase().trim();
        String cleanScopeType = scopeType.toUpperCase().trim();
        String cleanScopeCode = scopeCode.trim();

        List<ScoreDistributionSummary> list = scoreDistributionSummaryRepository.findDistribution(
                year, cleanTargetCode, cleanScopeType, cleanScopeCode
        );

        if (list.isEmpty()) {
            return ScoreDistributionResponse.builder()
                    .year(year)
                    .targetCode(cleanTargetCode)
                    .scopeType(cleanScopeType)
                    .scopeCode(cleanScopeCode)
                    .totalCandidates(0)
                    .histogram(Collections.emptyList())
                    .build();
        }

        int totalCandidates = list.get(0).getTotalCandidates();
        BigDecimal maxScore = list.get(list.size() - 1).getScore();
        BigDecimal minScore = list.get(0).getScore();

        BigDecimal sumScoreTimesCount = BigDecimal.ZERO;
        BigDecimal modeScore = null;
        int maxCount = -1;

        List<ScoreDistributionResponse.Point> points = new ArrayList<>(list.size());
        for (ScoreDistributionSummary s : list) {
            points.add(ScoreDistributionResponse.Point.builder()
                    .score(s.getScore())
                    .candidateCount(s.getCandidateCount())
                    .higherCount(s.getHigherCount())
                    .lowerCount(s.getLowerCount())
                    .rankStart(s.getRankStart())
                    .percentile(s.getPercentile())
                    .build());

            BigDecimal countBD = BigDecimal.valueOf(s.getCandidateCount());
            sumScoreTimesCount = sumScoreTimesCount.add(s.getScore().multiply(countBD));

            if (s.getCandidateCount() > maxCount) {
                maxCount = s.getCandidateCount();
                modeScore = s.getScore();
            }
        }

        BigDecimal averageScore = totalCandidates > 0
                ? sumScoreTimesCount.divide(BigDecimal.valueOf(totalCandidates), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        // Tính Median
        BigDecimal medianScore = calculateMedian(list, totalCandidates);

        return ScoreDistributionResponse.builder()
                .year(year)
                .targetType(list.get(0).getTargetType())
                .targetCode(cleanTargetCode)
                .targetName(getTargetName(cleanTargetCode))
                .scopeType(cleanScopeType)
                .scopeCode(cleanScopeCode)
                .totalCandidates(totalCandidates)
                .averageScore(averageScore)
                .medianScore(medianScore)
                .modeScore(modeScore)
                .maxScore(maxScore)
                .minScore(minScore)
                .histogram(points)
                .build();
    }

    private BigDecimal calculateMedian(List<ScoreDistributionSummary> list, int total) {
        if (total == 0) return BigDecimal.ZERO;
        int midIndex = total / 2;
        int runningCount = 0;
        for (ScoreDistributionSummary s : list) {
            runningCount += s.getCandidateCount();
            if (runningCount >= midIndex) {
                return s.getScore();
            }
        }
        return list.get(list.size() - 1).getScore();
    }

    private String getTargetName(String code) {
        return switch (code) {
            case "MATH" -> "Toán học";
            case "LITERATURE" -> "Ngữ văn";
            case "PHYSICS" -> "Vật lí";
            case "CHEMISTRY" -> "Hóa học";
            case "BIOLOGY" -> "Sinh học";
            case "HISTORY" -> "Lịch sử";
            case "GEOGRAPHY" -> "Địa lí";
            case "ECONOMIC_LEGAL" -> "GD Kinh tế & Pháp luật";
            case "INFORMATICS" -> "Tin học";
            case "TECHNOLOGY" -> "Công nghệ";
            case "FOREIGN_LANG" -> "Ngoại ngữ";
            case "A00" -> "Khối A00 (Toán, Lý, Hóa)";
            case "A01" -> "Khối A01 (Toán, Lý, Anh)";
            case "A02" -> "Khối A02 (Toán, Lý, Sinh)";
            case "B00" -> "Khối B00 (Toán, Hóa, Sinh)";
            case "B08" -> "Khối B08 (Toán, Sinh, Anh)";
            case "C00" -> "Khối C00 (Văn, Sử, Địa)";
            case "C01" -> "Khối C01 (Văn, Toán, Lý)";
            case "D01" -> "Khối D01 (Toán, Văn, Anh)";
            case "D07" -> "Khối D07 (Toán, Hóa, Anh)";
            case "X01" -> "Khối X01 (Toán, Tin, Anh)";
            case "X02" -> "Khối X02 (Toán, Công nghệ, Lý)";
            default -> code;
        };
    }

    /**
     * Tra cứu vị trí thứ hạng cho một mức điểm bất kỳ
     */
    @Transactional(readOnly = true)
    public RankPositionResponse getRankPosition(short year, String targetCode, BigDecimal score, String province, String region) {
        String cleanTargetCode = targetCode.toUpperCase().trim();

        RankPositionResponse.ScopeRank national = scoreDistributionSummaryRepository
                .findByExactScore(year, cleanTargetCode, "NATIONAL", "ALL", score)
                .map(this::mapScopeRank)
                .orElse(null);

        RankPositionResponse.ScopeRank reg = null;
        if (region != null && !region.isBlank()) {
            reg = scoreDistributionSummaryRepository
                    .findByExactScore(year, cleanTargetCode, "REGION", region.trim(), score)
                    .map(this::mapScopeRank)
                    .orElse(null);
        }

        RankPositionResponse.ScopeRank prov = null;
        if (province != null && !province.isBlank()) {
            prov = scoreDistributionSummaryRepository
                    .findByExactScore(year, cleanTargetCode, "PROVINCE", province.trim(), score)
                    .map(this::mapScopeRank)
                    .orElse(null);
        }

        return RankPositionResponse.builder()
                .year(year)
                .targetCode(cleanTargetCode)
                .score(score)
                .national(national)
                .region(reg)
                .province(prov)
                .build();
    }

    private RankPositionResponse.ScopeRank mapScopeRank(ScoreDistributionSummary s) {
        return RankPositionResponse.ScopeRank.builder()
                .scopeCode(s.getScopeCode())
                .candidateCount(s.getCandidateCount())
                .higherCount(s.getHigherCount())
                .lowerCount(s.getLowerCount())
                .totalCandidates(s.getTotalCandidates())
                .rank(s.getRankStart())
                .percentile(s.getPercentile())
                .build();
    }
}
