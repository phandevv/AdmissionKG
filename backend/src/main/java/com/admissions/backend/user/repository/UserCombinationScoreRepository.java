package com.admissions.backend.user.repository;

import com.admissions.backend.user.entity.UserCombinationScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCombinationScoreRepository extends JpaRepository<UserCombinationScore, Long> {

    List<UserCombinationScore> findByAcademicProfile_Id(Long profileId);

    List<UserCombinationScore> findByAcademicProfile_IdAndMethodType(Long profileId, String methodType);

    Optional<UserCombinationScore> findByAcademicProfile_IdAndSubjectCombination_CombinationCodeAndMethodType(
            Long profileId, String combinationCode, String methodType);

    @Modifying
    @Query("DELETE FROM UserCombinationScore u WHERE u.academicProfile.id = :profileId")
    void deleteByAcademicProfileId(@Param("profileId") Long profileId);

    @Modifying
    @Query("DELETE FROM UserCombinationScore u WHERE u.academicProfile.id = :profileId AND u.methodType = :methodType AND u.subjectCombination.combinationCode NOT IN :validCodes")
    void deleteObsoleteScores(
            @Param("profileId") Long profileId,
            @Param("methodType") String methodType,
            @Param("validCodes") List<String> validCodes);

    @Modifying
    @Query("DELETE FROM UserCombinationScore u WHERE u.academicProfile.id = :profileId AND u.methodType = :methodType")
    void deleteByAcademicProfileIdAndMethodType(
            @Param("profileId") Long profileId,
            @Param("methodType") String methodType);
}
