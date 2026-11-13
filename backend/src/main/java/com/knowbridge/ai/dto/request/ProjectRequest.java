package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectRequest {

    @NotBlank(message = "Project name is required")
    @Size(max = 180, message = "Project name cannot exceed 180 characters")
    private String name;

    private String description;

    private String status = "Planning";

    private Long ownerId;

    private String owner;

    private String startDate;

    private Integer members = 1;

    public ProjectRequest() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setOwnerName(String ownerName) {
        if (this.owner == null || this.owner.isBlank()) {
            this.owner = ownerName;
        }
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Integer getMembers() {
        return members;
    }

    public void setMembers(Integer members) {
        this.members = members;
    }

    public void setPlannedMemberCount(Integer plannedMemberCount) {
        if (plannedMemberCount != null) {
            this.members = plannedMemberCount;
        }
    }
}
