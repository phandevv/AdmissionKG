package com.admissions.backend.admission.service;

import com.admissions.backend.admission.dto.AdmissionMethodDto;
import com.admissions.backend.admission.entity.AdmissionMethod;
import com.admissions.backend.admission.repository.AdmissionMethodRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdmissionMethodService {

    private final AdmissionMethodRepository methodRepository;

    @Transactional(readOnly = true)
    public List<AdmissionMethodDto> getAll() {
        return methodRepository.findAll().stream()
                .map(AdmissionMethodDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdmissionMethodDto getById(String methodId) {
        AdmissionMethod method = methodRepository.findById(methodId)
                .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", methodId));
        return AdmissionMethodDto.from(method);
    }

    @Transactional
    public AdmissionMethodDto create(AdmissionMethodDto dto) {
        AdmissionMethod method = AdmissionMethod.builder()
                .methodId(dto.methodId())
                .methodCode(dto.methodCode())
                .methodName(dto.methodName())
                .targetGroup(dto.targetGroup())
                .build();
        return AdmissionMethodDto.from(methodRepository.save(method));
    }

    @Transactional
    public AdmissionMethodDto update(String methodId, AdmissionMethodDto dto) {
        AdmissionMethod method = methodRepository.findById(methodId)
                .orElseThrow(() -> new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", methodId));

        method.setMethodCode(dto.methodCode());
        method.setMethodName(dto.methodName());
        method.setTargetGroup(dto.targetGroup());

        return AdmissionMethodDto.from(methodRepository.save(method));
    }

    @Transactional
    public void delete(String methodId) {
        if (!methodRepository.existsById(methodId)) {
            throw new ResourceNotFoundException("Phương thức tuyển sinh", "methodId", methodId);
        }
        methodRepository.deleteById(methodId);
    }
}
