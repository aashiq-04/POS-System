// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import './ProductComponents.css';

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [product, setProduct] = useState({ name: '', price: '', unit: '',isWeighed:false });

  // useEffect(() => {
  //   if (editingProduct) {
  //     setProduct(editingProduct);
  //   }
  // }, [editingProduct]);
  useEffect(() => {
    if (editingProduct) {
      setProduct({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        unit: editingProduct.unit || '',
        isWeighed: editingProduct.isWeighed || false,
        id: editingProduct.id  // don't forget ID for update
      });
    }
  }, [editingProduct]);
  // const handleChange = (e) => {
  //   setProduct({ ...product, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    // setProduct({ name: '', price: '', stock: '' });
    setProduct({ name: '', price: '', unit: ''});

  };

  return (
    <div className="product-form">
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
      <input name="unit"  placeholder="Unit" value={product.unit} onChange={handleChange} required />
      {/* <input type="checkbox" name="isWeighed" checked={product.isWeighed || false} onChange={handleChange} />
      <label> Priced by weight
      </label> */}
      <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
    </form>
    </div>
  );
};

export default ProductForm;
