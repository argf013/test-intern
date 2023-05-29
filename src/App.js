import './App.css';
import React, { useState } from 'react';

const menuNames = [
  { name: "Nasi Goreng", price: "25.000" },
  { name: "Ayam Bakar", price: "30.000" },
  { name: "Mie Goreng", price: "20.000" },
  { name: "Sate Ayam", price: "15.000" },
  { name: "Ikan Bakar", price: "35.000" },
  { name: "Soto Ayam", price: "18.000" },
  { name: "Nasi Uduk", price: "15.000" },
  { name: "Bakso", price: "12.000" },
  { name: "Soto Betawi", price: "20.000" },
  { name: "Soto Padang", price: "25.000" },
  { name: "Nasi Padang", price: "30.000" },
  { name: "Mie Ayam", price: "18.000" },
  { name: "Nasi Kuning", price: "15.000" },
  { name: "Gado-Gado", price: "20.000" },
  { name: "Rendang", price: "35.000" },
  { name: "Soto Lamongan", price: "18.000" },
  { name: "Sop Buntut", price: "40.000" },
  { name: "Nasi Rawon", price: "25.000" },
  { name: "Es Teh", price: "5.000" },
  { name: "Es Jeruk", price: "8.000" }
];

const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);

  const addOrderedMenuItem = (orderItem) => {
    const orderedMenuCard = (
      <div className="ordered-menu-card">
        <p className="ordered-menu-name">
          {`${orderItem.name} ${orderItem.quantity > 1 ? `x${orderItem.quantity}` : ''}`}
        </p>
        <p className="ordered-menu-price">{orderItem.price}</p>
      </div>
    );
    return orderedMenuCard;
  };

  const updateOrderedMenu = () => {
    const orderedMenuCards = orderItems.map((orderItem) => addOrderedMenuItem(orderItem));
    return orderedMenuCards;
  };

  const clearSale = () => {
    setOrderItems([]);
    setDiscountApplied(false);
  };

  const calculateTotal = () => {
    let subtotal = 0;

    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      const price = parseFloat(orderItem.price.replace("Rp ", "").replace(".", ""));

      subtotal += price * orderItem.quantity;
    }

    let total = subtotal;
    if (discountApplied) {
      total *= 0.9;
    }

    return {
      subtotal: `Rp ${parseFloat(subtotal)}`,
      total: `Rp ${parseFloat(total)}`,
    };
  };

  const handleMenuCardClick = (menuName) => {
    const existingOrderItem = orderItems.find((item) => item.name === menuName);

    if (existingOrderItem) {
      existingOrderItem.quantity++;
      setOrderItems([...orderItems]);
    } else {
      const newOrderItem = {
        name: menuName,
        price: menuNames.find((menu) => menu.name === menuName).price,
        quantity: 1,
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
  };

  const handleDiscountCode = (code) => {
    if (code === 'DISKON10') {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  const menuCards = menuNames.map((menu, index) => (
    <div className="menu-card" key={index} onClick={() => handleMenuCardClick(menu.name)}>
      <img
        src={`https://picsum.photos/200.webp?random=${index}`}
        alt="Menu"
      />
      <p className="menu-name">{menu.name}</p>
    </div>
  ));
  

  const orderedMenuCards = updateOrderedMenu();
  const { subtotal, total } = calculateTotal();

  const saveBill = () => {
    alert("Bill saved successfully!");
  };

  const printBill = () => {
    window.print();
  };

  const charge = () => {
    const payment = prompt("Enter the payment amount:");
    const paymentAmount = parseFloat(payment);

    if (isNaN(paymentAmount)) {
      alert("Invalid payment amount!");
      return;
    }

    const totalAmount = parseFloat(total.replace("Rp ", "").replace(".", ""));
    let change = 0;

    if (paymentAmount >= totalAmount) {
      change = paymentAmount - totalAmount;
      alert(
        `Total Charge: Rp ${totalAmount}\nPayment: Rp ${paymentAmount.toLocaleString()}\nChange: Rp ${change.toLocaleString()}`
      );
    } else {
      alert("Insufficient payment amount!");
    }
  };

  return (
    <div className="container">
      <div className="menu-list">
        <div className="menu-container" id="menuContainer">
          {menuCards}
        </div>
      </div>

      <div className="card-form">
        <div className="card-form-header">New Customer</div>

        <div className="card-form-content">
          <div className="dine-2">
            <div className="dine">
              <span>Dine in</span>
            </div>
          </div>
          <br />

          <div id="orderedMenuContainer" className="orderedMenuContainer">
            {orderedMenuCards}
          </div>

          <div className="form-section">
            <label htmlFor="subtotal">Subtotal:</label>
            <span id="subtotal-info">{subtotal}</span>
          </div>

          <div className="form-section">
            <label htmlFor="total">Total:</label>
            <span id="total-info">{total}</span>
          </div>

          <div className="form-section">
            <label htmlFor="discount-code">Discount Code:</label>
            <input
              placeholder='Enter discount code'
              type="text"
              id="discount-code"
              onChange={(e) => handleDiscountCode(e.target.value)}
            />
          </div>

          <div className="button-container">
            <div className="Clear-sale">
              <button type="button" id="clear-sale" className="w3-btn" onClick={clearSale}>
                Clear Sale
              </button>
            </div>

            <div className="o">
              <div className="">
                <button className="w3-btn yeah" id="save-bill" onClick={saveBill}>
                  Save Bill
                </button>
                <button className="w3-btn yeah" id="print-bill" onClick={printBill}>
                  Print Bill
                </button>
              </div>
            </div>
          </div>
          <div className="charge">
            <button type="button" className="w3-btn" id="charge" onClick={charge}>
              Charge {total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
