package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Handover;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HandoverRepository extends JpaRepository<Handover, Long> {
    List<Handover> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<Handover> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT h FROM Handover h WHERE h.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR h.project.id = :projectId) " +
           "AND (:status IS NULL OR h.status = :status) " +
           "AND (:search IS NULL OR LOWER(h.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(h.fromName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(h.toName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Handover> searchHandovers(@Param("workspaceId") Long workspaceId,
                                  @Param("projectId") Long projectId,
                                  @Param("status") String status,
                                  @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
