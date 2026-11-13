package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HandoverChecklistItemRequest {

    @NotBlank(message = "Checklist item label is required")
    @Size(max = 255, message = "Label cannot exceed 255 characters")
    private String label;

    private Boolean done = false;

    private Integer sortOrder = 0;

    public HandoverChecklistItemRequest() {}

    public HandoverChecklistItemRequest(String label, Boolean done, Integer sortOrder) {
        this.label = label;
        this.done = done != null ? done : false;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Boolean getDone() { return done; }
    public void setDone(Boolean done) { this.done = done; }

    // Support isDone alias from frontend
    public void setIsDone(Boolean isDone) {
        if (isDone != null) this.done = isDone;
    }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
