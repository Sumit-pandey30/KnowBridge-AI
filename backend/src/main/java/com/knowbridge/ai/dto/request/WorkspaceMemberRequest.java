package com.knowbridge.ai.dto.request;

import jakarta.validation.constraints.NotBlank;

public class WorkspaceMemberRequest {

    private Long userId;

    private String email;

    @NotBlank(message = "Role is required")
    private String role = "MEMBER";

    public WorkspaceMemberRequest() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
