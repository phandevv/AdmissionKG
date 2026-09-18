package com.admissions.backend.tao.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.tao.dto.TwdEvaluationLogDto;
import com.admissions.backend.tao.entity.TwdEvaluationLog;
import com.admissions.backend.tao.repository.TwdEvaluationLogRepository;
import com.admissions.backend.user.entity.UserWish;
import com.admissions.backend.user.repository.UserWishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TwdEvaluationLogService {

    private final TwdEvaluationLogRepository logRepository;
    private final UserWishRepository wishRepository;

    @Transactional(readOnly = true)
    public List<TwdEvaluationLogDto> getAll() {
        return logRepository.findAll().stream()
                .map(TwdEvaluationLogDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TwdEvaluationLogDto getById(Long logId) {
        TwdEvaluationLog log = logRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Nhật ký đánh giá TWD", "logId", logId));
        return TwdEvaluationLogDto.from(log);
    }

    @Transactional(readOnly = true)
    public TwdEvaluationLogDto getByWish(Long wishId) {
        TwdEvaluationLog log = logRepository.findByUserWish_Id(wishId)
                .orElseThrow(() -> new ResourceNotFoundException("Nhật ký đánh giá TWD", "wishId", wishId));
        return TwdEvaluationLogDto.from(log);
    }

    @Transactional
    public TwdEvaluationLogDto createOrUpdate(TwdEvaluationLogDto dto) {
        UserWish wish = wishRepository.findById(dto.wishId())
                .orElseThrow(() -> new ResourceNotFoundException("Nguyện vọng người dùng", "wishId", dto.wishId()));

        TwdEvaluationLog log = logRepository.findByUserWish_Id(dto.wishId())
                .orElse(TwdEvaluationLog.builder().userWish(wish).build());

        log.setFinalAdmissionScore(dto.finalAdmissionScore());
        log.setTwdRiskZone(dto.twdRiskZone());
        log.setSafetyMargin(dto.safetyMargin());
        log.setEligibilityStatus(dto.eligibilityStatus());
        log.setRecommendationStrategy(dto.recommendationStrategy());

        return TwdEvaluationLogDto.from(logRepository.save(log));
    }

    @Transactional
    public void delete(Long logId) {
        if (!logRepository.existsById(logId)) {
            throw new ResourceNotFoundException("Nhật ký đánh giá TWD", "logId", logId);
        }
        logRepository.deleteById(logId);
    }
}
