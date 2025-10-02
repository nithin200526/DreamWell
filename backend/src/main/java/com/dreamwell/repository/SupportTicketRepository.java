package com.dreamwell.repository;

import com.dreamwell.entity.SupportTicket;
import com.dreamwell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByUserOrderByCreatedAtDesc(User user);
    List<SupportTicket> findByStatusOrderByCreatedAtDesc(SupportTicket.Status status);
    List<SupportTicket> findAllByOrderByCreatedAtDesc();
}
