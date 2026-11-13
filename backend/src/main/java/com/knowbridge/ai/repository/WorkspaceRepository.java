package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    @Query("SELECT w FROM Workspace w JOIN WorkspaceMember wm ON wm.workspace = w WHERE wm.user.id = :userId")
    List<Workspace> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT w FROM Workspace w JOIN WorkspaceMember wm ON wm.workspace = w WHERE wm.user.id = :userId AND wm.role = 'OWNER'")
    List<Workspace> findOwnedByUserId(@Param("userId") Long userId);
}
