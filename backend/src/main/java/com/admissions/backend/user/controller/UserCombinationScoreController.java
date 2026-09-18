package com.admissions.backend.user.controller;

import com.admissions.backend.user.dto.UserCombinationScoreDto;
import com.admissions.backend.user.repository.UserCombinationScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-combination-scores")
@RequiredArgsConstructor
public class UserCombinationScoreController {

    private final UserCombinationScoreRepository combinationScoreRepository;


    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<UserCombinationScoreDto>> getByProfileId(
            @PathVariable Long profileId,
            @RequestParam(required = false) String methodType) {
        List<UserCombinationScoreDto> list;
        if (methodType != null && !methodType.isBlank()) {
            list = combinationScoreRepository.findByAcademicProfile_IdAndMethodType(profileId, methodType)
                    .stream()
                    .map(UserCombinationScoreDto::from)
                    .toList();
        } else {
            list = combinationScoreRepository.findByAcademicProfile_Id(profileId)
                    .stream()
                    .map(UserCombinationScoreDto::from)
                    .toList();
        }
        return ResponseEntity.ok(list);
    }
}
