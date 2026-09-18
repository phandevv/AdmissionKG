package com.admissions.backend.subject.service;

import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.subject.dto.SubjectDto;
import com.admissions.backend.subject.entity.Subject;
import com.admissions.backend.subject.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public List<SubjectDto> getAll() {
        return subjectRepository.findAll().stream()
                .map(SubjectDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public SubjectDto getById(String subjectCode) {
        Subject subject = subjectRepository.findById(subjectCode)
                .orElseThrow(() -> new ResourceNotFoundException("Môn học", "subjectCode", subjectCode));
        return SubjectDto.from(subject);
    }

    @Transactional
    public SubjectDto create(SubjectDto dto) {
        Subject subject = Subject.builder()
                .subjectCode(dto.subjectCode())
                .subjectName(dto.subjectName())
                .subjectCategory(dto.subjectCategory())
                .build();
        return SubjectDto.from(subjectRepository.save(subject));
    }

    @Transactional
    public SubjectDto update(String subjectCode, SubjectDto dto) {
        Subject subject = subjectRepository.findById(subjectCode)
                .orElseThrow(() -> new ResourceNotFoundException("Môn học", "subjectCode", subjectCode));

        subject.setSubjectName(dto.subjectName());
        subject.setSubjectCategory(dto.subjectCategory());

        return SubjectDto.from(subjectRepository.save(subject));
    }

    @Transactional
    public void delete(String subjectCode) {
        if (!subjectRepository.existsById(subjectCode)) {
            throw new ResourceNotFoundException("Môn học", "subjectCode", subjectCode);
        }
        subjectRepository.deleteById(subjectCode);
    }
}
