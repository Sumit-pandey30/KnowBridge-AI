package com.knowbridge.ai.dto.response;

import java.time.LocalDateTime;

public class HandoverChecklistItemResponse {

    private Long id;
    private String label;
    private Boolean isDone;
    private Integer sortOrder;
    private LocalDateTime completedAt;

    public HandoverChecklistItemResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Boolean getIsDone() { return isDone; }
    public void setIsDone(Boolean isDone) { this.isDone = isDone; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
