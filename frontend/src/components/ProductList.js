// src/components/ProductList.js
import React from 'react';
import './ProductComponents.css';
const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="product-list">
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Unit</th>
        {/* <th>Is Weighed?</th> */}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>₹{product.price}</td>
          <td>{product.unit}</td>
          {/* <td>{product.isWeighed ? 'Yes' : 'No'}</td> */}
          <td>
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

export default ProductList;
