package com.knowbridge.ai.dto.response;

public class WorkspaceSettingsResponse {

    private Long id;
    private Long workspaceId;
    private String workspaceName;
    private String description;
    private String visibility;
    private Boolean notificationsEnabled;
    private Boolean projectUpdatesEnabled;
    private Boolean taskRemindersEnabled;

    public WorkspaceSettingsResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }

    public String getWorkspaceName() { return workspaceName; }
    public void setWorkspaceName(String workspaceName) { this.workspaceName = workspaceName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getVisibility() { return visibility; }
    public void setVisibility(String visibility) { this.visibility = visibility; }

    public Boolean getNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(Boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }

    public Boolean getProjectUpdatesEnabled() { return projectUpdatesEnabled; }
    public void setProjectUpdatesEnabled(Boolean projectUpdatesEnabled) { this.projectUpdatesEnabled = projectUpdatesEnabled; }

    public Boolean getTaskRemindersEnabled() { return taskRemindersEnabled; }
    public void setTaskRemindersEnabled(Boolean taskRemindersEnabled) { this.taskRemindersEnabled = taskRemindersEnabled; }
}
