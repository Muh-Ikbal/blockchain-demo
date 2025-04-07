import React, { useState, useEffect, useRef } from 'react';
import TransactionForm from '../components/TransactionForm';
import BlockchainDisplay from '../components/BlockchainDisplay';
import UserList from '../components/UserList';

export default function DemoDistributed() {
  const [blockchain, setBlockchain] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(100);
  const socketRef = useRef(null);
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const port = 8081;
  useEffect(() => {
    // Inisialisasi koneksi WebSocket ketika komponen dimuat
    // socketRef.current = new WebSocket('ws://:8081');
    socketRef.current = new WebSocket(`${protocol}://kitakerjait.site:${port}`);


    // Menghasilkan ID pengguna unik
    const generatedUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    setUserId(generatedUserId);

    // Event handler untuk koneksi terbuka
    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);

      // Kirim pesan untuk bergabung dengan sistem
      socketRef.current.send(
        JSON.stringify({
          type: 'JOIN',
          userId: generatedUserId,
          timestamp: new Date().toISOString(),
        }),
      );
    };

    // Event handler untuk menerima pesan
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'BLOCKCHAIN_UPDATE':
          setBlockchain(message.data);
          break;
        case 'PENDING_TRANSACTIONS':
          setPendingTransactions(message.data);
          break;
        case 'USER_LIST':
          setUsers(message.data);
          break;
        case 'NEW_TRANSACTION':
          // Update saldo jika transaksi melibatkan pengguna ini
          if (message.transaction.sender === generatedUserId) {
            setBalance(
              (prevBalance) => prevBalance - message.transaction.amount,
            );
          } else if (message.transaction.recipient === generatedUserId) {
            setBalance(
              (prevBalance) => prevBalance + message.transaction.amount,
            );
          }
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    };

    // Event handler untuk penutupan koneksi
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    // Event handler untuk error
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Membersihkan koneksi saat komponen dibongkar
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Fungsi untuk mengirim transaksi baru
  const sendTransaction = (recipient, amount) => {
    if (!isConnected) {
      alert('Not connected to server!');
      return;
    }

    if (amount > balance) {
      alert('Insufficient balance!');
      return;
    }

    const transaction = {
      sender: userId,
      recipient,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(
      JSON.stringify({
        type: 'NEW_TRANSACTION',
        transaction,
      }),
    );
  };

  // Fungsi untuk meminta penambangan blok
  const mineBlock = () => {
    if (!isConnected) {
      alert('Not connected to server!');
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: 'MINE_BLOCK',
        userId,
      }),
    );
  };

  return (
    <div className='App'>
      <header className='App-header pt-25'>
        <h1 className='peer-title'>Demo Transaksi Blockchain</h1>
        <div className='connection-status'>
          {isConnected ? (
            <span className='status-connected'>Connected</span>
          ) : (
            <span className='status-disconnected'>Disconnected</span>
          )}
        </div>
      </header>

      <div className='main-content '>
        <div className='user-info peer-box'>
          <h2>User Information</h2>
          <p>
            <strong>Your ID:</strong> {userId}
          </p>
          <p>
            <strong>Balance:</strong> {balance}
          </p>
        </div>

        <div className='users-section'>
          <UserList users={users} currentUserId={userId} />
        </div>

        <div className='transaction-section'>
          <TransactionForm
            onSubmit={sendTransaction}
            users={users.filter((user) => user.id !== userId)}
          />
          <button
            className='mine-button'
            onClick={mineBlock}
            disabled={pendingTransactions.length === 0}
          >
            Mine Block ({pendingTransactions.length} pending txs)
          </button>
        </div>

        <div className='blockchain-section peer-box'>
          <BlockchainDisplay blockchain={blockchain} />
        </div>
      </div>
    </div>
  );
}
