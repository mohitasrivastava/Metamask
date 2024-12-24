import React, { useState } from 'react';
import { ethers } from 'ethers';

// 0x356F58E30A54377d129FB12aa4e83d6eF218351D
const MetaMask = () => {
  console.log('meta');
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setErrorMessage('Install MetaMask please!!');
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [String(accountAddress), 'latest'],
      })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance)); // Use utils.formatEther
      });
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    let params = [
      {
        from: '0xd253bbacde6f3dd0d15f7c7e5166dc952d64b5aa',
        to: e.target.to_address.value,
        gas: Number(21000).toString(16),
        gasPrice: Number(21000).toString(16),
        value: Number(10000000000000000).toString(16),
      },
    ];
    let result = await window.ethereum
      .request({ method: 'eth_sendTransaction', params })
      .catch((e) => console.log(e, 'error'));
  };

  const productSelect = async (e) => {
    let sales_value;

    const selectedProduct = e.target.elements.product_form.value;
    console.log(selectedProduct, 'selectedProduct');
    if (selectedProduct === 'product1') {
      sales_value = 10000000000000000;
    } else if (selectedProduct === 'product2') {
      sales_value = 20000000000000000;
    } else if (selectedProduct === 'product3') {
      sales_value = 30000000000000000;
    }

    // Ensure sales_value is set before proceeding
    if (!sales_value) {
      console.error('Invalid product selected');
      return;
    }
    let params = [
      {
        from: '0xd253bbacde6f3dd0d15f7c7e5166dc952d64b5aa',
        to: '0x356F58E30A54377d129FB12aa4e83d6eF218351D',
        gas: Number(21000).toString(16),
        gasPrice: Number(21000).toString(16),
        value: Number(sales_value).toString(16),
      },
    ];
    let result = await window.ethereum
      .request({ method: 'eth_sendTransaction', params })
      .catch((e) => console.log(e, 'error'));
  };

  return (
    <center>
      <h1>MetaMask Wallet Connection </h1>

      <button onClick={connectWallet}>Connect Wallet Button</button>
      <h3>Address: {defaultAccount}</h3>
      <h3>Balance: {userBalance}</h3>

      <form onSubmit={sendTransaction}>
        <h3>Enter Transaction Address:</h3>

        <input
          type="text"
          name="to_address"
          placeholder="Recipient address"
          required
        />

        <input type="submit" value="submit" />
      </form>
      <hr />
      <form onSubmit={productSelect}>
        <label>Pick your Product:</label>
        <select name="product_form" id="product_form">
          <option value="product1"> Product 1</option>
          <option value="product2"> Product 2</option>
          <option value="product3"> Product 3</option>
        </select>

        <input type="submit" value="submit" />
      </form>
      {errorMessage}
    </center>
  );
};

export default MetaMask;
