package com.knowbridge.ai.dto.request;

public class WorkspaceSettingsRequest {

    private String workspaceName;
    private String description;
    private String visibility;

    private Boolean notificationsEnabled;
    private Boolean projectUpdatesEnabled;
    private Boolean taskRemindersEnabled;

    public WorkspaceSettingsRequest() {}

    public String getWorkspaceName() {
        return workspaceName;
    }

    public void setWorkspaceName(String workspaceName) {
        this.workspaceName = workspaceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public Boolean getNotificationsEnabled() {
        return notificationsEnabled;
    }

    public void setNotificationsEnabled(Boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    public void setNotifications(Boolean notifications) {
        if (this.notificationsEnabled == null) {
            this.notificationsEnabled = notifications;
        }
    }

    public Boolean getProjectUpdatesEnabled() {
        return projectUpdatesEnabled;
    }

    public void setProjectUpdatesEnabled(Boolean projectUpdatesEnabled) {
        this.projectUpdatesEnabled = projectUpdatesEnabled;
    }

    public void setProjectUpdates(Boolean projectUpdates) {
        if (this.projectUpdatesEnabled == null) {
            this.projectUpdatesEnabled = projectUpdates;
        }
    }

    public Boolean getTaskRemindersEnabled() {
        return taskRemindersEnabled;
    }

    public void setTaskRemindersEnabled(Boolean taskRemindersEnabled) {
        this.taskRemindersEnabled = taskRemindersEnabled;
    }

    public void setTaskReminders(Boolean taskReminders) {
        if (this.taskRemindersEnabled == null) {
            this.taskRemindersEnabled = taskReminders;
        }
    }
}
