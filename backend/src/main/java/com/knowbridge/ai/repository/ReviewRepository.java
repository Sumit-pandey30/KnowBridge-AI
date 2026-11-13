package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<Review> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT r FROM Review r WHERE r.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR r.project.id = :projectId) " +
           "AND (:status IS NULL OR r.status = :status) " +
           "AND (:search IS NULL OR LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(r.reviewerName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Review> searchReviews(@Param("workspaceId") Long workspaceId,
                              @Param("projectId") Long projectId,
                              @Param("status") String status,
                              @Param("search") String search);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
}
