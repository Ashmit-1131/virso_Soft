import React, { useState } from 'react';

function Components() {
  const initialCoins = {
    BTC_25000: {
      quantity: 0,
      description: '',
      price: 25000,
    },
    DODGE: {
      quantity: 0,
      description: '',
      price: 0.75,
    },
    RIPPLE: {
      quantity: 0,
      description: '',
      price: 1.5,
    },
  };

  const [coins, setCoins] = useState(initialCoins);

  const addToCart = (coin) => {
    const { quantity, description, price } = coins[coin];
    if (quantity > 0) {
      setCoins({
        ...coins,
        [coin]: { ...coins[coin], quantity: 0, description: '' },
      });

      setCart((prevCart) => ({
        ...prevCart,
        [coin]: { quantity, description, price },
      }));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const coin in cart) {
      total += cart[coin].quantity * cart[coin].price;
    }
    return total.toFixed(2);
  };

  const [cart, setCart] = useState({});
  return (
    <div style={{ display: 'grid' }}>
      <h1>Cart</h1>
      <div className='main-box' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(coins).map((coin) => (
          <div
            style={{
              backgroundColor: 'yellow',
              color: 'white',
              padding: '20px',
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
            key={coin}
          >
            <h2>{coin}</h2>
            <p>Price: ${coins[coin].price}</p>
            <button
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={() => addToCart(coin)}
            >
              Add to Cart
            </button>
            <div>
              <input
                type='number'
                step='0.01'
                value={coins[coin].quantity}
                onChange={(e) =>
                  setCoins({
                    ...coins,
                    [coin]: { ...coins[coin], quantity: parseFloat(e.target.value) },
                  })
                }
                placeholder={`Enter Quantity`}
              />
              <input
                type='text'
                value={coins[coin].description}
                onChange={(e) =>
                  setCoins({
                    ...coins,
                    [coin]: { ...coins[coin], description: e.target.value },
                  })
                }
                placeholder={`Desc`}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Cart</h2>
        <ul>
          {Object.keys(cart).map((coin) => (
            <li key={coin}>
              {coin}: {cart[coin].quantity} = ${(cart[coin].quantity * cart[coin].price).toFixed(
                2
              )}{' '}
              - Desc: {cart[coin].description}
            </li>
          ))}
        </ul>
        <p>Total Amount: ${calculateTotal()}</p>
      </div>
    </div>
  );
}

export default Components;

