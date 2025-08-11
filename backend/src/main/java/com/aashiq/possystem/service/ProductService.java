package com.aashiq.possystem.service;

import com.aashiq.possystem.model.Product;
import com.aashiq.possystem.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public void addProduct(Product product) {
        productRepository.save(product);
    }
    public Product getAllProductsById(Integer id) {
        return productRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Product not found"));
    }
    public Product updateProduct(Integer id, Product updatedProduct) {
        Product product = getAllProductsById(id);
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
//        product.setStock(updatedProduct.getStock());
        return productRepository.save(product);

    }
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
