package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<Project> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT p FROM Project p WHERE p.workspace.id = :workspaceId " +
           "AND (:status IS NULL OR p.status = :status) " +
           "AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Project> searchProjects(@Param("workspaceId") Long workspaceId,
                                @Param("status") String status,
                                @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
