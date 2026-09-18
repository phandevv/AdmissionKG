package com.admissions.backend.user.repository;

import com.admissions.backend.user.entity.UserWish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWishRepository extends JpaRepository<UserWish, Long> {
    List<UserWish> findByUser_IdOrderByWishOrderAsc(Long userId);
}
