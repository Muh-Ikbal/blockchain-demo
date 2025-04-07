import React, { useState } from 'react';

function TransactionForm({ onSubmit, users }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipient || !amount) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(recipient, amount);
    setAmount('');
  };

  return (
    <div className='transaction-form peer-box'>
      <h2>Send Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Recipient:</label>
          <select
          className='input-neon'
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value=''>Select Recipient</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Amount:</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={amount}
            className='input-neon'
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='send-button'>
          Send
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
