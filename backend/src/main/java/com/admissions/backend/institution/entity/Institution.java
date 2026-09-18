package com.admissions.backend.institution.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "institutions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Institution {

    @Id
    @Column(name = "institution_id", length = 50, nullable = false)
    private String institutionId;

    @Column(name = "institution_code", length = 50, nullable = false, unique = true)
    private String institutionCode;

    @Column(name = "institution_name", nullable = false)
    private String institutionName;

    @Column(name = "institution_type", length = 100)
    private String institutionType;

    @Column(name = "province_city", length = 100)
    private String provinceCity;

    @Column(name = "region", length = 50)
    private String region;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_institution_id")
    private Institution parentInstitution;

    @OneToMany(mappedBy = "parentInstitution", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Institution> subInstitutions = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "contact_info", columnDefinition = "jsonb")
    private Map<String, Object> contactInfo;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Campus> campuses = new ArrayList<>();

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AdmissionScheme> admissionSchemes = new ArrayList<>();

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UniversalConversion> conversions = new ArrayList<>();

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<BonusPolicy> bonusPolicies = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    public String getInstitutionId() { return institutionId; }
    public void setInstitutionId(String institutionId) { this.institutionId = institutionId; }

    public String getInstitutionCode() { return institutionCode; }
    public void setInstitutionCode(String institutionCode) { this.institutionCode = institutionCode; }

    public String getInstitutionName() { return institutionName; }
    public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }

    public String getInstitutionType() { return institutionType; }
    public void setInstitutionType(String institutionType) { this.institutionType = institutionType; }

    public String getProvinceCity() { return provinceCity; }
    public void setProvinceCity(String provinceCity) { this.provinceCity = provinceCity; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public Institution getParentInstitution() { return parentInstitution; }
    public void setParentInstitution(Institution parentInstitution) { this.parentInstitution = parentInstitution; }

    public List<Institution> getSubInstitutions() { return subInstitutions; }
    public void setSubInstitutions(List<Institution> subInstitutions) { this.subInstitutions = subInstitutions; }

    public Map<String, Object> getContactInfo() { return contactInfo; }
    public void setContactInfo(Map<String, Object> contactInfo) { this.contactInfo = contactInfo; }

    public List<Campus> getCampuses() { return campuses; }
    public void setCampuses(List<Campus> campuses) { this.campuses = campuses; }

    public List<AdmissionScheme> getAdmissionSchemes() { return admissionSchemes; }
    public void setAdmissionSchemes(List<AdmissionScheme> admissionSchemes) { this.admissionSchemes = admissionSchemes; }

    public List<UniversalConversion> getConversions() { return conversions; }
    public void setConversions(List<UniversalConversion> conversions) { this.conversions = conversions; }

    public List<BonusPolicy> getBonusPolicies() { return bonusPolicies; }
    public void setBonusPolicies(List<BonusPolicy> bonusPolicies) { this.bonusPolicies = bonusPolicies; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
