package com.knowbridge.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "handover_checklist_items")
public class HandoverChecklistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "handover_id", nullable = false)
    private Handover handover;

    @Column(nullable = false, length = 255)
    private String label;

    @Column(name = "is_done", nullable = false)
    private Boolean isDone = false;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "completed_by")
    private User completedBy;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        if (isDone == null) isDone = false;
        if (sortOrder == null) sortOrder = 0;
    }

    public HandoverChecklistItem() {}

    public HandoverChecklistItem(Handover handover, String label, Boolean isDone, Integer sortOrder) {
        this.handover = handover;
        this.label = label;
        this.isDone = isDone != null ? isDone : false;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Handover getHandover() { return handover; }
    public void setHandover(Handover handover) { this.handover = handover; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Boolean getIsDone() { return isDone; }
    public void setIsDone(Boolean isDone) { this.isDone = isDone; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public User getCompletedBy() { return completedBy; }
    public void setCompletedBy(User completedBy) { this.completedBy = completedBy; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
