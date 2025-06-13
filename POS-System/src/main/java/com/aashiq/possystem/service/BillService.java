package com.aashiq.possystem.service;


import com.aashiq.possystem.model.Bill;
import com.aashiq.possystem.model.BillItem;
import com.aashiq.possystem.model.Product;
import com.aashiq.possystem.repository.BillRepository;
import com.aashiq.possystem.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class BillService {
    @Autowired
    private  BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }


    public Bill createBillNew(List<BillItem> items) {
        Bill bill = new Bill();
        bill.setCreatedAt(LocalDateTime.now());
        for(BillItem item : items) {
            Integer productId = item.getProduct().getId();
            Product product = productRepository.findById(productId).orElseThrow(()-> new RuntimeException("Product not found"));
            item.setProduct(product);
            item.setBill(bill);
        }
        bill.setItem(items);
        double total = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
        bill.setTotalAmout(total);
        return billRepository.save(bill);
    }


    @Transactional
    public List<Bill> getAllBills() {
        return billRepository.findAllWithProductDetails();
    }
}
