
package com.knowbridge.ai.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class HandoverRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    private Long projectId;

    private String project;

    private Long fromUserId;

    @NotBlank(message = "Handover from is required")
    @Size(max = 120)
    private String from;

    private Long toUserId;

    @NotBlank(message = "Handover to is required")
    @Size(max = 120)
    private String to;

    private String date;

    private String status = "Pending";

    private String notes;

    @Valid
    private List<HandoverChecklistItemRequest> checklist;

    public HandoverRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Long getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(Long fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setFromName(String fromName) {
        if (this.from == null || this.from.isBlank()) {
            this.from = fromName;
        }
    }

    public Long getToUserId() {
        return toUserId;
    }

    public void setToUserId(Long toUserId) {
        this.toUserId = toUserId;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setToName(String toName) {
        if (this.to == null || this.to.isBlank()) {
            this.to = toName;
        }
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setHandoverDate(String handoverDate) {
        if (this.date == null || this.date.isBlank()) {
            this.date = handoverDate;
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<HandoverChecklistItemRequest> getChecklist() {
        return checklist;
    }

    public void setChecklist(List<HandoverChecklistItemRequest> checklist) {
        this.checklist = checklist;
    }
}
