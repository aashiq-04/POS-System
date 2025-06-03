package com.aashiq.possystem.repository;

import com.aashiq.possystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Integer> {

}
