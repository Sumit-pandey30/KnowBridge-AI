package com.knowbridge.ai.dto.response;

public class WorkspaceSummaryResponse {

    private Long workspaceId;
    private String workspaceName;
    private Long totalProjects;
    private Long totalSources;
    private Long totalDecisions;
    private Long totalTasks;
    private Long totalVerifications;
    private Long totalReviews;
    private Long totalHandovers;

    public WorkspaceSummaryResponse() {}

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }

    public String getWorkspaceName() { return workspaceName; }
    public void setWorkspaceName(String workspaceName) { this.workspaceName = workspaceName; }

    public Long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(Long totalProjects) { this.totalProjects = totalProjects; }

    public Long getTotalSources() { return totalSources; }
    public void setTotalSources(Long totalSources) { this.totalSources = totalSources; }

    public Long getTotalDecisions() { return totalDecisions; }
    public void setTotalDecisions(Long totalDecisions) { this.totalDecisions = totalDecisions; }

    public Long getTotalTasks() { return totalTasks; }
    public void setTotalTasks(Long totalTasks) { this.totalTasks = totalTasks; }

    public Long getTotalVerifications() { return totalVerifications; }
    public void setTotalVerifications(Long totalVerifications) { this.totalVerifications = totalVerifications; }

    public Long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Long totalReviews) { this.totalReviews = totalReviews; }

    public Long getTotalHandovers() { return totalHandovers; }
    public void setTotalHandovers(Long totalHandovers) { this.totalHandovers = totalHandovers; }
}
