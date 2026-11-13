package com.knowbridge.ai.dto.response;

public class AuthResponse {

    private String token;
    private String tokenType = "Bearer";
    private UserResponse user;
    private Long workspaceId;

    public AuthResponse() {}

    public AuthResponse(String token, UserResponse user, Long workspaceId) {
        this.token = token;
        this.user = user;
        this.workspaceId = workspaceId;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }
}
