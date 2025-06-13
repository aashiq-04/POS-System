package com.aashiq.possystem.repository;

import com.aashiq.possystem.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    @Query("SELECT DISTINCT b FROM Bill b " +
            "LEFT JOIN FETCH b.item i " +
            "LEFT JOIN FETCH i.product p " +
            "ORDER BY b.createdAt DESC")
    List<Bill> findAllWithProductDetails();
}
