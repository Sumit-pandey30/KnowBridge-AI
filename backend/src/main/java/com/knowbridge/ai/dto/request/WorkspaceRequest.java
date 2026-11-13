package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class WorkspaceRequest {

    @NotBlank(message = "Workspace name is required")
    @Size(max = 150, message = "Workspace name cannot exceed 150 characters")
    private String name;

    private String description;

    private String visibility = "Private";

    public WorkspaceRequest() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWorkspaceName(String workspaceName) {
        if (this.name == null || this.name.isBlank()) {
            this.name = workspaceName;
        }
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
}
