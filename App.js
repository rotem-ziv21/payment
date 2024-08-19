import React, { useState } from 'react';
import './App.css';

function PaymentForm() {
  const [price, setPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('מעבד את הבקשה...');

    try {
      const response = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TerminalNumber: 154042,
          ApiName: "4eh4Cel12HyLaPn6sN2t",
          ApiPassword: "CarU8GMg4VhRoUhEcmq9",
          ReturnValue: "Z12332X",
          Amount: parseFloat(price),
          SuccessRedirectUrl: "https://www.google.com",
          FailedRedirectUrl: "https://www.yahoo.com",
          Document: {
            To: "לקוח",
            Products: [
              {
                Description: productName,
                UnitCost: parseFloat(price)
              }
            ]
          }
        }),
      });

      const data = await response.json();

      if (data && data.LowProfileUrl) {
        window.location.href = data.LowProfileUrl;
      } else {
        setStatus('אירעה שגיאה בעת יצירת הקישור לתשלום');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('אירעה שגיאה בעת שליחת הבקשה');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="price">מחיר:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productName">שם המוצר:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <button type="submit">שלם</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>אפליקציית תשלומים</h1>
        <PaymentForm />
      </header>
    </div>
  );
}

export default App;
