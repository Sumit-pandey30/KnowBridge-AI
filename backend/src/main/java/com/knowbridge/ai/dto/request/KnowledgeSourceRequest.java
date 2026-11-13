package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class KnowledgeSourceRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    private String type = "Document";

    private Long projectId;

    private String project;

    private String description;

    private String link;

    private String status = "Pending Review";

    private String date;

    public KnowledgeSourceRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSourceType(String sourceType) {
        if (sourceType != null && !sourceType.isBlank()) {
            this.type = sourceType;
        }
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setSourceUrl(String sourceUrl) {
        if (this.link == null || this.link.isBlank()) {
            this.link = sourceUrl;
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setSourceDate(String sourceDate) {
        if (this.date == null || this.date.isBlank()) {
            this.date = sourceDate;
        }
    }
}
