package com.admissions.backend.user.service;

import com.admissions.backend.admission.entity.TrackMethodCombination;
import com.admissions.backend.admission.repository.TrackMethodCombinationRepository;
import com.admissions.backend.common.exception.ResourceNotFoundException;
import com.admissions.backend.user.dto.UserWishDto;
import com.admissions.backend.user.entity.User;
import com.admissions.backend.user.entity.UserAcademicProfile;
import com.admissions.backend.user.entity.UserWish;
import com.admissions.backend.user.repository.UserAcademicProfileRepository;
import com.admissions.backend.user.repository.UserRepository;
import com.admissions.backend.user.repository.UserWishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserWishService {

    private final UserWishRepository wishRepository;
    private final UserRepository userRepository;
    private final UserAcademicProfileRepository profileRepository;
    private final TrackMethodCombinationRepository tmcRepository;

    @Transactional(readOnly = true)
    public List<UserWishDto> getAll() {
        return wishRepository.findAll().stream()
                .map(UserWishDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserWishDto getById(Long wishId) {
        UserWish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new ResourceNotFoundException("Nguyện vọng người dùng", "wishId", wishId));
        return UserWishDto.from(wish);
    }

    @Transactional(readOnly = true)
    public List<UserWishDto> getByUser(Long userId) {
        return wishRepository.findByUser_IdOrderByWishOrderAsc(userId).stream()
                .map(UserWishDto::from)
                .toList();
    }

    @Transactional
    public UserWishDto create(UserWishDto dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", dto.userId()));

        UserAcademicProfile profile = null;
        if (dto.profileId() != null) {
            profile = profileRepository.findById(dto.profileId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hồ sơ học tập", "profileId", dto.profileId()));
        }

        TrackMethodCombination tmc = tmcRepository.findById(dto.tmcId())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp phương thức tuyển sinh", "tmcId", dto.tmcId()));

        UserWish wish = UserWish.builder()
                .user(user)
                .academicProfile(profile)
                .wishOrder(dto.wishOrder())
                .trackMethodCombination(tmc)
                .build();

        return UserWishDto.from(wishRepository.save(wish));
    }

    @Transactional
    public UserWishDto update(Long wishId, UserWishDto dto) {
        UserWish wish = wishRepository.findById(wishId)
                .orElseThrow(() -> new ResourceNotFoundException("Nguyện vọng người dùng", "wishId", wishId));

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "userId", dto.userId()));

        UserAcademicProfile profile = null;
        if (dto.profileId() != null) {
            profile = profileRepository.findById(dto.profileId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hồ sơ học tập", "profileId", dto.profileId()));
        }

        TrackMethodCombination tmc = tmcRepository.findById(dto.tmcId())
                .orElseThrow(() -> new ResourceNotFoundException("Tổ hợp phương thức tuyển sinh", "tmcId", dto.tmcId()));

        wish.setUser(user);
        wish.setAcademicProfile(profile);
        wish.setWishOrder(dto.wishOrder());
        wish.setTrackMethodCombination(tmc);

        return UserWishDto.from(wishRepository.save(wish));
    }

    @Transactional
    public void delete(Long wishId) {
        if (!wishRepository.existsById(wishId)) {
            throw new ResourceNotFoundException("Nguyện vọng người dùng", "wishId", wishId);
        }
        wishRepository.deleteById(wishId);
    }
}
