import './App.css';
import ProductsPage from './pages/ProductsPage';
import BillingPage from './pages/BillingPage';
import BillHistory from './components/BillHistory';
import { BrowserRouter as Router, Route,Link, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <nav className='home-nav'>
          <Link to="/">Billing</Link>
          <Link to="/products">Product Management</Link>
          <Link to="/bills">Bill History</Link>
          {/* <Link to="/test">Test</Link> */}
        </nav>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<BillingPage />} />
          <Route path="/bills" element={<BillHistory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
