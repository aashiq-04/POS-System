import React, { useEffect, useState } from 'react';
import * as billService from '../services/BillService';
import '../pages/CSS/billing.css'; // Reuse same styles

const BillHistoryPage = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    billService.getBills().then(res => {
        console.log("Response from /bills:", res.data);
      setBills(res.data);
    }).catch(err => {
      console.error("Failed to fetch bills", err);
    });
  }, []);

  return (
    <div className="billing-container">
      <h1>📜 Bill History</h1>

      {bills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        bills.map(bill => (
          <div className="cart-section" key={bill.id}>
            <h2>🧾 Bill #{bill.id}</h2>
            <p><strong>Date:</strong> {new Date(bill.formattedCreatedAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{bill.totalAmout}</p>

            {bill.item && bill.item.map((item, idx) => (
            <div className="cart-item" key={idx}>
            <span><strong>Product ID:</strong> {item.product?.id}</span>
            <span><strong>Product Name:</strong> {item.product?.name}</span>
            <span><strong>Price:</strong> ₹{item.price}</span>
            <span><strong>Qty:</strong> {item.quantity}</span>
            <span>= ₹{item.price * item.quantity}</span>
            </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default BillHistoryPage;
