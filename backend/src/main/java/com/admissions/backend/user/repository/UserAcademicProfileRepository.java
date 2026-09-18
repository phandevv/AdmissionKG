package com.admissions.backend.user.repository;

import com.admissions.backend.user.entity.UserAcademicProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAcademicProfileRepository extends JpaRepository<UserAcademicProfile, Long> {
    List<UserAcademicProfile> findByUser_Id(Long userId);
}
