package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.VerificationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationRecord, Long> {
    List<VerificationRecord> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<VerificationRecord> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT v FROM VerificationRecord v WHERE v.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR v.project.id = :projectId) " +
           "AND (:status IS NULL OR v.status = :status) " +
           "AND (:search IS NULL OR LOWER(v.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(v.reviewerName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<VerificationRecord> searchRecords(@Param("workspaceId") Long workspaceId,
                                          @Param("projectId") Long projectId,
                                          @Param("status") String status,
                                          @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
