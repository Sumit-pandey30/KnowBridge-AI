package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.KnowledgeSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KnowledgeSourceRepository extends JpaRepository<KnowledgeSource, Long> {
    List<KnowledgeSource> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<KnowledgeSource> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT k FROM KnowledgeSource k WHERE k.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR k.project.id = :projectId) " +
           "AND (:sourceType IS NULL OR k.sourceType = :sourceType) " +
           "AND (:status IS NULL OR k.status = :status) " +
           "AND (:search IS NULL OR LOWER(k.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(k.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<KnowledgeSource> searchSources(@Param("workspaceId") Long workspaceId,
                                        @Param("projectId") Long projectId,
                                        @Param("sourceType") String sourceType,
                                        @Param("status") String status,
                                        @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
