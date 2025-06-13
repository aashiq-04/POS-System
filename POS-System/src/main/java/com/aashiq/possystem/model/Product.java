package com.aashiq.possystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.Objects;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Double price;
//    private String unit;
//    private Boolean isWeighed;

    public void setPrice(Double price) {
        this.price = price;
    }

//    public Boolean getWeighed() {
//        return isWeighed;
//    }
//
//    public void setWeighed(Boolean weighed) {
//        isWeighed = weighed;
//    }
//
//    public String getUnit() {
//        return unit;
//    }
//
//    public void setUnit(String unit) {
//        this.unit = unit;
//    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) && Objects.equals(name, product.name) && Objects.equals(price, product.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price);
    }

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Collection<BillItem> billItem;

    public Collection<BillItem> getBillItem() {
        return billItem;
    }

    public void setBillItem(Collection<BillItem> billItem) {
        this.billItem = billItem;
    }
}
