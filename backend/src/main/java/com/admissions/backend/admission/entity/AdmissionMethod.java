package com.admissions.backend.admission.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "admission_methods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdmissionMethod {

    @Id
    @Column(name = "method_id", length = 50, nullable = false)
    private String methodId;

    @Column(name = "method_code", length = 50, nullable = false)
    private String methodCode;

    @Column(name = "method_name", nullable = false)
    private String methodName;

    @Column(name = "target_group", length = 100)
    private String targetGroup;

    @OneToMany(mappedBy = "admissionMethod", cascade = CascadeType.ALL)
    @Builder.Default
    private List<TrackMethodCombination> trackMethodCombinations = new ArrayList<>();
}
