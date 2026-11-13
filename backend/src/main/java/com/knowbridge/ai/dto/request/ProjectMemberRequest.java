package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotNull;

public class ProjectMemberRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    private String projectRole = "Contributor";

    public ProjectMemberRequest() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProjectRole() {
        return projectRole;
    }

    public void setProjectRole(String projectRole) {
        this.projectRole = projectRole;
    }
}
