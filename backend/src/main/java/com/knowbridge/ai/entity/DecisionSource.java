package com.knowbridge.ai.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "decision_sources")
@IdClass(DecisionSource.DecisionSourceId.class)
public class DecisionSource {

    @Id
    @Column(name = "decision_id")
    private Long decisionId;

    @Id
    @Column(name = "source_id")
    private Long sourceId;

    public DecisionSource() {}

    public DecisionSource(Long decisionId, Long sourceId) {
        this.decisionId = decisionId;
        this.sourceId = sourceId;
    }

    public Long getDecisionId() { return decisionId; }
    public void setDecisionId(Long decisionId) { this.decisionId = decisionId; }

    public Long getSourceId() { return sourceId; }
    public void setSourceId(Long sourceId) { this.sourceId = sourceId; }

    public static class DecisionSourceId implements Serializable {
        private Long decisionId;
        private Long sourceId;

        public DecisionSourceId() {}

        public DecisionSourceId(Long decisionId, Long sourceId) {
            this.decisionId = decisionId;
            this.sourceId = sourceId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof DecisionSourceId that)) return false;
            return Objects.equals(decisionId, that.decisionId) && Objects.equals(sourceId, that.sourceId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(decisionId, sourceId);
        }
    }
}
