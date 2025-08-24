// src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import './CSS/products.css';
import * as productService from '../services/ProductService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    const res = await productService.getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddOrUpdate = async (product) => {
    if (product.id) {
      await productService.updateProduct(product.id, product);
    } else {
      await productService.addProduct(product);
    }
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await productService.deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="products-page">
    <h1>Product Management</h1>
    <div className="product-form">
      <ProductForm onSubmit={handleAddOrUpdate} editingProduct={editingProduct} />
    </div>
    <div className="product-list">
      <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
    </div>
  </div>
  );
};

export default ProductsPage;
