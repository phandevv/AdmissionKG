package com.admissions.backend.subject.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.common.dto.PageResponse;
import com.admissions.backend.subject.dto.CategoryCountsDto;
import com.admissions.backend.subject.dto.SubjectCombinationDto;
import com.admissions.backend.subject.entity.CombinationSubject;
import com.admissions.backend.subject.entity.CombinationSubjectId;
import com.admissions.backend.subject.entity.Subject;
import com.admissions.backend.subject.entity.SubjectCombination;
import com.admissions.backend.subject.repository.CombinationSubjectRepository;
import com.admissions.backend.subject.repository.SubjectCombinationRepository;
import com.admissions.backend.subject.repository.SubjectCombinationSpecifications;
import com.admissions.backend.subject.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectCombinationService {

    private final SubjectCombinationRepository combinationRepository;
    private final SubjectRepository subjectRepository;
    private final CombinationSubjectRepository combinationSubjectRepository;

    @Transactional(readOnly = true)
    public List<SubjectCombinationDto> getAll() {
        return combinationRepository.findAll().stream()
                .map(SubjectCombinationDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponse<SubjectCombinationDto> getPaginated(int page, int size, String keyword, String category, String subject) {
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size), Sort.by("combinationCode").ascending());
        Specification<SubjectCombination> spec = SubjectCombinationSpecifications.withFilters(keyword, category, subject);
        Page<SubjectCombination> entityPage = combinationRepository.findAll(spec, pageable);
        return PageResponse.from(entityPage.map(SubjectCombinationDto::from));
    }

    @Transactional(readOnly = true)
    public CategoryCountsDto getCategoryCounts() {
        List<Object[]> list = combinationRepository.getCategoryCountsRaw();
        if (list.isEmpty() || list.get(0) == null) {
            return new CategoryCountsDto(0, 0, 0, 0, 0, 0, 0);
        }
        Object[] row = list.get(0);
        long all = row[0] != null ? ((Number) row[0]).longValue() : 0L;
        long a = row[1] != null ? ((Number) row[1]).longValue() : 0L;
        long b = row[2] != null ? ((Number) row[2]).longValue() : 0L;
        long c = row[3] != null ? ((Number) row[3]).longValue() : 0L;
        long d = row[4] != null ? ((Number) row[4]).longValue() : 0L;
        long x = row[5] != null ? ((Number) row[5]).longValue() : 0L;
        long nk = row[6] != null ? ((Number) row[6]).longValue() : 0L;
        return new CategoryCountsDto(all, a, b, c, d, x, nk);
    }

    @Transactional(readOnly = true)
    public SubjectCombinationDto getById(String code) {
        SubjectCombination entity = combinationRepository.findById(code)
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp môn", "combinationCode", code));
        return SubjectCombinationDto.from(entity);
    }

    @Transactional
    public SubjectCombinationDto create(SubjectCombinationDto dto) {
        SubjectCombination combination = SubjectCombination.builder()
                .combinationCode(dto.combinationCode())
                .combinationName(dto.combinationName())
                .build();
        SubjectCombination saved = combinationRepository.save(combination);

        if (dto.subjectCodes() != null) {
            for (String subjectCode : dto.subjectCodes()) {
                Subject subject = subjectRepository.findById(subjectCode)
                        .orElseThrow(() -> new ResourceNotFoundException("Môn học", "subjectCode", subjectCode));
                CombinationSubject item = CombinationSubject.builder()
                        .id(new CombinationSubjectId(saved.getCombinationCode(), subjectCode))
                        .subjectCombination(saved)
                        .subject(subject)
                        .build();
                combinationSubjectRepository.save(item);
            }
        }

        return getById(saved.getCombinationCode());
    }

    @Transactional
    public SubjectCombinationDto update(String code, SubjectCombinationDto dto) {
        SubjectCombination combination = combinationRepository.findById(code)
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp môn", "combinationCode", code));

        combination.setCombinationName(dto.combinationName());
        combinationRepository.save(combination);

        if (dto.subjectCodes() != null) {
            List<CombinationSubject> oldSubjects = combinationSubjectRepository.findById_CombinationCode(code);
            combinationSubjectRepository.deleteAll(oldSubjects);

            for (String subjectCode : dto.subjectCodes()) {
                Subject subject = subjectRepository.findById(subjectCode)
                        .orElseThrow(() -> new ResourceNotFoundException("Môn học", "subjectCode", subjectCode));
                CombinationSubject item = CombinationSubject.builder()
                        .id(new CombinationSubjectId(code, subjectCode))
                        .subjectCombination(combination)
                        .subject(subject)
                        .build();
                combinationSubjectRepository.save(item);
            }
        }

        return getById(code);
    }

    @Transactional
    public void delete(String code) {
        if (!combinationRepository.existsById(code)) {
            throw new ResourceNotFoundException("Tổ hợp môn", "combinationCode", code);
        }
        combinationRepository.deleteById(code);
    }
}
