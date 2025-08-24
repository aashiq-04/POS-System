import React, { useEffect, useState } from 'react';
import * as productService from '../services/ProductService';
import './CSS/billing.css';
import * as billService from '../services/BillService';

const BillingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [customPrices, setCustomPrices] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    productService.getProducts().then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleCustomPriceChange = (id, value) => {
    setCustomPrices({ ...customPrices, [id]: value });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (product) => {
    if (!product.id) return;

    const quantity = parseFloat(quantities[product.id]) || 1;
    const price = parseFloat(customPrices[product.id]) || product.price;

    const existing = cart.find(p => p.id === product.id);

    if (existing) {
      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + quantity, price }
          : p
      ));
    } else {
      setCart([...cart, { ...product, quantity, price }]);
    }

    setQuantities({ ...quantities, [product.id]: '' });
    setCustomPrices({ ...customPrices, [product.id]: '' });
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: parseFloat(newQuantity) || 1 } : item
    ));
  };

  const updateCartPrice = (id, newPrice) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, price: parseFloat(newPrice) || 0 } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cart.some(item => !item.id)) {
      setMessage('❌ Some items are invalid. Please check the cart.');
      setMessageType('error');
      return;
    }

    try {
      await billService.createBill(cart);
      setMessage('✅ Bill created successfully!');
      setMessageType('success');
      setCart([]);
    } catch (err) {
      console.error('Checkout failed', err);
      setMessage('❌ Checkout failed. Please try again.');
      setMessageType('error');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="billing-container">
      <h1>🧾 Billing System</h1>

      <div className="billing-body">
        {/* Left Column - Product List */}
        <div className="product-column">
          <input
            type="text"
            className="search-box"
            placeholder="Search product..."
            value={searchText}
            onChange={handleSearchChange}
          />

          <div className="product-list">
            <h2>Available Products</h2>
            {filteredProducts.length === 0 && <p>No matching products</p>}
            {filteredProducts.map(product => (
              <div className="product-item" key={product.id}>
                <span className="product-name">{product.name}</span>
                <span>₹{product.price} / {product.unit}</span>
                <span>Custom Price ₹:</span>
                <input
                  type="number"
                  value={customPrices[product.id] ?? ''}
                  onChange={(e) => handleCustomPriceChange(product.id, e.target.value)}
                />
                <span>Quantity:</span>
                <input
                  type="number"
                  min="0"
                  max={product.stock}
                  value={quantities[product.id] ?? ''}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
                <button onClick={() => addToCart(product)}>Add</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Cart */}
        <div className="cart-column">
          <div className="cart-section">
            <h2>🛒 Cart</h2>
            {cart.length === 0 && <p>Your cart is empty</p>}
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <span className="product-name">{item.name}</span>
                <span>₹{item.price}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateCartPrice(item.id, e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateCartQuantity(item.id, e.target.value)}
                />
                <span>= ₹{(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
            ))}
            {cart.length > 0 && (
              <div className="total-section">
                <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
              </div>
            )}
            {message && (
              <div className={`checkout-message ${messageType}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
