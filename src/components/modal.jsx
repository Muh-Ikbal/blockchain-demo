import React, { useState } from 'react';

const Modal = ({setIsOpen,addBlock}) => {
  const [sender,setSender] = useState('')
  const [receiver,setReceiver] = useState('')
  const [amount,setAmount] = useState('')
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-60'>
      <div className='peer-box bg-black p-6 max-w-md'>
        <p className='peer-title text-center'>Add Transaction</p>
        <div className='flex flex-col items-start  p-2'>
          <label className='notification-title'>Enter Sender:</label>
          <input
            type='text'
            placeholder='Type here...'
            value={sender}
            className='input-neon mt-2'
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start  p-2'>
          <label className='notification-title'>Enter Receiver:</label>
          <input
            type='text'
            placeholder='Type here...'
            value={receiver}
            className='input-neon mt-2'
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-star p-2'>
          <label className='notification-title'>Enter Amount:</label>
          <input
            type='number'
            placeholder='Rp. 0'
            value={amount}
            className='input-neon mt-2'
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='flex px-2 gap-2'>
          <button
            className='mt-4 w-full px-4 py-2 bg-neon-red text-white rounded '
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            className='mt-4 w-full px-4 py-2 bg-neon-blue text-white rounded '
            onClick={() => addBlock(sender,receiver,amount)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
