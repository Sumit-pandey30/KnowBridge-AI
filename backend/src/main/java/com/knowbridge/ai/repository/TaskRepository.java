package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByWorkspaceIdOrderByCreatedAtDesc(Long workspaceId);
    Optional<Task> findByIdAndWorkspaceId(Long id, Long workspaceId);

    @Query("SELECT t FROM Task t WHERE t.workspace.id = :workspaceId " +
           "AND (:projectId IS NULL OR t.project.id = :projectId) " +
           "AND (:status IS NULL OR t.status = :status) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:assigneeId IS NULL OR t.assignee.id = :assigneeId) " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(t.assigneeName) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Task> searchTasks(@Param("workspaceId") Long workspaceId,
                          @Param("projectId") Long projectId,
                          @Param("status") String status,
                          @Param("priority") String priority,
                          @Param("assigneeId") Long assigneeId,
                          @Param("search") String search);

    @Query("SELECT t FROM Task t WHERE t.workspace.id = :workspaceId AND t.dueDate < :today AND t.status != 'Completed'")
    List<Task> findOverdueTasks(@Param("workspaceId") Long workspaceId, @Param("today") LocalDate today);

    List<Task> findByWorkspaceIdAndStatus(Long workspaceId, String status);

    long countByWorkspaceId(Long workspaceId);
    long countByWorkspaceIdAndStatus(Long workspaceId, String status);
    long countByWorkspaceIdAndStatusNot(Long workspaceId, String status);
}
