package com.aashiq.possystem.service;

import com.aashiq.possystem.repository.BillItemRepository;
import com.aashiq.possystem.repository.BillRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AnalyticsService {
    private BillRepository billRepository;
    private BillItemRepository billItemRepository;

    public Map<String, Object> getAnalytics(LocalDateTime start, LocalDateTime end)
    {
        Map<String, Object> result= new HashMap<>();
        Double revenue = billRepository.getTotalRevenueBetweenDates(start, end);
        Long billCount = billRepository.getBillCountBetweenDates(start, end);
        List<Object[]> topProductsRaw = billItemRepository.findTopSellingProducts(start, end);

        int totalItemSold = 0;
        List<Map<String, Object>> topProducts = new ArrayList<>();

        for(Object[] row: topProductsRaw)
        {
            String name = (String) row[0];
            Long quantity = (Long) row[1];

            Map<String, Object> item = new HashMap<>();
            item.put("name", name);
            item.put("quantitySold", quantity);
            topProducts.add(item);

            totalItemSold += quantity;
        }

        result.put("totalRevenue", revenue != null ? revenue : 0.0);
        result.put("totalBills", billCount);
        result.put("totalItemsSold", totalItemSold);
        result.put("topProducts", topProducts);

        return result;
    }
}
