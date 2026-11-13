package com.knowbridge.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workspace_settings")
public class WorkspaceSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false, unique = true)
    private Workspace workspace;

    @Column(name = "notifications_enabled", nullable = false)
    private Boolean notificationsEnabled = true;

    @Column(name = "project_updates_enabled", nullable = false)
    private Boolean projectUpdatesEnabled = true;

    @Column(name = "task_reminders_enabled", nullable = false)
    private Boolean taskRemindersEnabled = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
        if (notificationsEnabled == null) notificationsEnabled = true;
        if (projectUpdatesEnabled == null) projectUpdatesEnabled = true;
        if (taskRemindersEnabled == null) taskRemindersEnabled = true;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public WorkspaceSetting() {}

    public WorkspaceSetting(Workspace workspace) {
        this.workspace = workspace;
        this.notificationsEnabled = true;
        this.projectUpdatesEnabled = true;
        this.taskRemindersEnabled = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

    public Boolean getNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(Boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }

    public Boolean getProjectUpdatesEnabled() { return projectUpdatesEnabled; }
    public void setProjectUpdatesEnabled(Boolean projectUpdatesEnabled) { this.projectUpdatesEnabled = projectUpdatesEnabled; }

    public Boolean getTaskRemindersEnabled() { return taskRemindersEnabled; }
    public void setTaskRemindersEnabled(Boolean taskRemindersEnabled) { this.taskRemindersEnabled = taskRemindersEnabled; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
