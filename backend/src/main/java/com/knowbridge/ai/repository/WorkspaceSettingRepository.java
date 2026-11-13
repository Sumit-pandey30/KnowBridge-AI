package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.WorkspaceSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceSettingRepository extends JpaRepository<WorkspaceSetting, Long> {
    Optional<WorkspaceSetting> findByWorkspaceId(Long workspaceId);
}
