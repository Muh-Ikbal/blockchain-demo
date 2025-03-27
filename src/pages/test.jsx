import React, { useState } from 'react';
import '../App.css';
import { SHA256 } from 'crypto-js';
import { createBlock, initializeBlockchain } from '../../lib/blockchain';
import Peer from '../components/peer';
import { handleInputChange } from '../../utils/handle-change-input/handleChange';

const Test = () => {
  const [blockchainA, setBlockchainA] = useState(initializeBlockchain());
  const [blockchainB, setBlockchainB] = useState(initializeBlockchain());
  const [blockchainC, setBlockchainC] = useState(initializeBlockchain());
  const [transactionData, setTransactionData] = useState({
    sender: '',
    receiver: '',
    amount: '',
  });

  console.log(blockchainA)
  console.log(blockchainB)
  console.log(blockchainC)

  const addBlock = () => {
    const lastBlock = blockchainA[blockchainA.length - 1];
    const newBlock = createBlock(
      blockchainA.length,
      lastBlock.hash,
      transactionData
    );
    setBlockchainA([...blockchainA, JSON.parse(JSON.stringify(newBlock))]);
    addBlockToAllPeer(newBlock);
    setTransactionData({ sender: '', receiver: '', amount: '' }); // Reset form
  };

  const addBlockToAllPeer = (newBlock) => {
    setBlockchainB((prevBlockchain) => [
      ...prevBlockchain,
      JSON.parse(JSON.stringify(newBlock)),
    ]);
    setBlockchainC((prevBlockchain) => [
      ...prevBlockchain,
      JSON.parse(JSON.stringify(newBlock)),
    ]);
  };


  return (
    <div className='App' id='container'>
      <h1>Simulasi Blockchain</h1>
      <div className='form-container mb-10'>
        <h2>Tambah Transaksi Baru</h2>
        <div className='flex gap-4 justify-center'>
          <input
            type='text'
            className='bg-white/20 rounded-lg p-2 border border-purple-500/20'
            placeholder='Pengirim'
            value={transactionData.sender}
            onChange={(e) =>
              setTransactionData({ ...transactionData, sender: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Penerima'
            className='bg-white/20 rounded-lg p-2 border border-purple-500/20'
            value={transactionData.receiver}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                receiver: e.target.value,
              })
            }
          />
          <input
            type='number'
            placeholder='Jumlah'
            className='bg-white/20 rounded-lg p-2 border border-purple-500/20'
            value={transactionData.amount}
            onChange={(e) =>
              setTransactionData({ ...transactionData, amount: e.target.value })
            }
          />
          <button
            className='bg-violet-500 p-2 rounded-lg shadow-sm hover:bg-violet-700 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-500'
            autoFocus
            onClick={addBlock}
            disabled={
              !transactionData.sender ||
              !transactionData.receiver ||
              !transactionData.amount
            }
          >
            Tambah Blok
          </button>
        </div>
      </div>
      <Peer
        blockchain={blockchainA}
        namePeer={'peer A'}
        onChange={handleInputChange}
        setBlockchain={setBlockchainA}
      />
      <Peer
        blockchain={blockchainB}
        namePeer={'peer B'}
        onChange={handleInputChange}
        setBlockchain={setBlockchainB}
      />
      <Peer
        blockchain={blockchainC}
        namePeer={'peer C'}
        onChange={handleInputChange}
        setBlockchain={setBlockchainC}
      />
    </div>
  );
};

export default Test;

// Fungsi untuk menghitung hash menggunakan SHA-256
