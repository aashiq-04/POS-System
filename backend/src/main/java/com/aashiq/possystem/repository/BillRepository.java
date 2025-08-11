package com.aashiq.possystem.repository;

import com.aashiq.possystem.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query("SELECT DISTINCT b FROM Bill b " +
            "LEFT JOIN FETCH b.item i " +
            "LEFT JOIN FETCH i.product p " +
            "ORDER BY b.createdAt DESC")
    List<Bill> findAllWithProductDetails();


    //Analytics Queries:
    @Query("SELECT SUM(b.totalAmout) FROM Bill b WHERE b.createdAt BETWEEN :start AND :end")
    Double getTotalRevenueBetweenDates(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(b) FROM Bill b WHERE b.createdAt BETWEEN :start AND :end")
    Long getBillCountBetweenDates(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
