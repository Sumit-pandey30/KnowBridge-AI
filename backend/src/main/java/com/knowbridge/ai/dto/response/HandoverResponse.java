package com.knowbridge.ai.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class HandoverResponse {

    private Long id;
    private String title;
    private String projectName;
    private Long projectId;
    private String fromName;
    private Long fromUserId;
    private String toName;
    private Long toUserId;
    private LocalDate handoverDate;
    private String status;
    private String notes;
    private List<HandoverChecklistItemResponse> checklist = new ArrayList<>();
    private Integer checklistTotal;
    private Integer checklistDone;
    private Long workspaceId;
    private LocalDateTime createdAt;

    public HandoverResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getFromName() { return fromName; }
    public void setFromName(String fromName) { this.fromName = fromName; }

    public Long getFromUserId() { return fromUserId; }
    public void setFromUserId(Long fromUserId) { this.fromUserId = fromUserId; }

    public String getToName() { return toName; }
    public void setToName(String toName) { this.toName = toName; }

    public Long getToUserId() { return toUserId; }
    public void setToUserId(Long toUserId) { this.toUserId = toUserId; }

    public LocalDate getHandoverDate() { return handoverDate; }
    public void setHandoverDate(LocalDate handoverDate) { this.handoverDate = handoverDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<HandoverChecklistItemResponse> getChecklist() { return checklist; }
    public void setChecklist(List<HandoverChecklistItemResponse> checklist) { this.checklist = checklist; }

    public Integer getChecklistTotal() { return checklistTotal; }
    public void setChecklistTotal(Integer checklistTotal) { this.checklistTotal = checklistTotal; }

    public Integer getChecklistDone() { return checklistDone; }
    public void setChecklistDone(Integer checklistDone) { this.checklistDone = checklistDone; }

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
