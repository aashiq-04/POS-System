package com.aashiq.possystem.repository;

import com.aashiq.possystem.model.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface BillItemRepository  extends JpaRepository<BillItem, Integer> {
    @Query("SELECT i.product.name, SUM(i.quantity) FROM BillItem i WHERE i.bill.createdAt BETWEEN :start AND :end GROUP BY i.product.name ORDER BY SUM(i.quantity) DESC ")
    List<Object[]> findTopSellingProducts(@Param("start")LocalDateTime start, @Param("end") LocalDateTime end);
}
