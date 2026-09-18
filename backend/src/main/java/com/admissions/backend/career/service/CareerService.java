package com.admissions.backend.career.service;

import com.admissions.backend.career.dto.CareerDto;
import com.admissions.backend.career.entity.Career;
import com.admissions.backend.career.repository.CareerRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerService {

    private final CareerRepository careerRepository;

    @Transactional(readOnly = true)
    public List<CareerDto> getAll() {
        return careerRepository.findAll().stream()
                .map(CareerDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CareerDto getById(String careerId) {
        Career career = careerRepository.findById(careerId)
                .orElseThrow(() -> new ResourceNotFoundException("Nghề nghiệp", "careerId", careerId));
        return CareerDto.from(career);
    }

    @Transactional(readOnly = true)
    public List<CareerDto> getByIndustry(String industry) {
        return careerRepository.findByIndustry(industry).stream()
                .map(CareerDto::from)
                .toList();
    }

    @Transactional
    public CareerDto create(CareerDto dto) {
        Career career = Career.builder()
                .careerId(dto.careerId())
                .careerTitle(dto.careerTitle())
                .industry(dto.industry())
                .requiredSkills(dto.requiredSkills())
                .build();
        return CareerDto.from(careerRepository.save(career));
    }

    @Transactional
    public CareerDto update(String careerId, CareerDto dto) {
        Career career = careerRepository.findById(careerId)
                .orElseThrow(() -> new ResourceNotFoundException("Nghề nghiệp", "careerId", careerId));

        career.setCareerTitle(dto.careerTitle());
        career.setIndustry(dto.industry());
        career.setRequiredSkills(dto.requiredSkills());

        return CareerDto.from(careerRepository.save(career));
    }

    @Transactional
    public void delete(String careerId) {
        if (!careerRepository.existsById(careerId)) {
            throw new ResourceNotFoundException("Nghề nghiệp", "careerId", careerId);
        }
        careerRepository.deleteById(careerId);
    }
}
