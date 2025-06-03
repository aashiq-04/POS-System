package com.aashiq.possystem.service;


import com.aashiq.possystem.model.Bill;
import com.aashiq.possystem.model.BillItem;
import com.aashiq.possystem.repository.BillRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class BillService {
    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill createBill(List<BillItem> items) {
        Bill bill = new Bill();
        bill.setCreatedAt(LocalDateTime.now());
        bill.setItem(items);
        double total = items.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
        bill.setTotalAmout(total);

        for (BillItem item : items) {
            item.setBill(bill);
        }

        return billRepository.save(bill);
    }

    @Transactional
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }
}
