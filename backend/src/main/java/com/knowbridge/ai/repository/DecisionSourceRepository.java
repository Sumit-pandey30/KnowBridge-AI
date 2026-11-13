package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.DecisionSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecisionSourceRepository extends JpaRepository<DecisionSource, DecisionSource.DecisionSourceId> {
    List<DecisionSource> findByDecisionId(Long decisionId);
    List<DecisionSource> findBySourceId(Long sourceId);
    void deleteByDecisionId(Long decisionId);
}
