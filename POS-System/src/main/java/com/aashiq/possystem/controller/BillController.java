package com.aashiq.possystem.controller;



import com.aashiq.possystem.model.Bill;
import com.aashiq.possystem.model.BillItem;
import com.aashiq.possystem.service.BillService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "*")
public class BillController {
    private final BillService billService;
    public BillController(BillService billService) {
        this.billService = billService;
    }


    @PostMapping
    public Bill createBill(@RequestBody List<BillItem> items)
    {
        System.out.println("Recieved items: " + items);
        return billService.createBillNew(items);
    }


    @Transactional
    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }
}
