package com.admissions.backend.subject.repository;

import com.admissions.backend.subject.entity.SubjectCombination;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public final class SubjectCombinationSpecifications {

    private SubjectCombinationSpecifications() {}

    public static Specification<SubjectCombination> withFilters(String keyword, String category, String subject) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isBlank()) {
                String pattern = "%" + keyword.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("combinationCode")), pattern),
                    cb.like(cb.lower(root.get("combinationName")), pattern)
                ));
            }

            if (category != null && !category.isBlank() && !"ALL".equalsIgnoreCase(category)) {
                String cat = category.trim().toUpperCase();
                if ("NANGKHIEU".equals(cat) || "NANG_KHIEU".equals(cat) || "NK".equals(cat)) {
                    predicates.add(cb.and(
                        cb.notLike(root.get("combinationCode"), "A%"),
                        cb.notLike(root.get("combinationCode"), "B%"),
                        cb.notLike(root.get("combinationCode"), "C%"),
                        cb.notLike(root.get("combinationCode"), "D%"),
                        cb.notLike(root.get("combinationCode"), "X%")
                    ));
                } else {
                    predicates.add(cb.like(root.get("combinationCode"), cat + "%"));
                }
            }

            if (subject != null && !subject.isBlank()) {
                String subPattern = "%" + subject.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("combinationName")), subPattern));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
