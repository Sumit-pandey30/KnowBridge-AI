package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {
    List<Decision> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<Decision> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT d FROM Decision d WHERE d.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR d.project.id = :projectId) " +
           "AND (:status IS NULL OR d.status = :status) " +
           "AND (:search IS NULL OR LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(d.ownerName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Decision> searchDecisions(@Param("workspaceId") Long workspaceId,
                                  @Param("projectId") Long projectId,
                                  @Param("status") String status,
                                  @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
