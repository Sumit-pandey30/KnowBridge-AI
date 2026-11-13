package com.knowbridge.ai.repository;

import com.knowbridge.ai.entity.HandoverChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HandoverChecklistRepository extends JpaRepository<HandoverChecklistItem, Long> {
    List<HandoverChecklistItem> findByHandoverIdOrderBySortOrderAscIdAsc(Long handoverId);
    Optional<HandoverChecklistItem> findByIdAndHandoverId(Long id, Long handoverId);
    void deleteByHandoverId(Long handoverId);
}
