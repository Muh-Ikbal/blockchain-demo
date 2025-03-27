import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
class Block {
  constructor(index, previousHash, sender, receiver, amount, nonce = 0) {
    this.index = index;
    this.previousHash = previousHash;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = new Date().toISOString();
    this.nonce = nonce;
    this.hash = this.mineBlock(); // Memastikan hash ditetapkan setelah mining selesai
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        this.sender +
        this.receiver +
        this.amount +
        this.nonce,
    ).toString();
  }

  mineBlock(difficulty = 3) {
    let hash = '';
    while (!hash.startsWith('0'.repeat(difficulty))) {
      this.nonce++;
      hash = this.calculateHash();
    }
    return hash;
  }
}

function Distributed() {
  const [users, setUsers] = useState([
    { name: 'Alice', pubkey: 'pub1', privkey: 'priv1', saldo: 500 },
    { name: 'Bob', pubkey: 'pub2', privkey: 'priv2', saldo: 300 },
    { name: 'Charlie', pubkey: 'pub3', privkey: 'priv3', saldo: 1000 },
  ]);
  const [blockchain, setBlockchain] = useState([
    new Block(0, '0', 'System', 'Alice', 1000),
  ]);
  const [invalidIndex, setInvalidIndex] = useState(null);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const addBlock = () => {
    if (!sender || !receiver || !amount || sender === receiver) {
      alert('Input tidak valid!');
      return;
    }
    const amountNum = parseFloat(amount);
    const senderUser = users.find((user) => user.name === sender);
    const receiverUser = users.find((user) => user.name === receiver);

    if (!senderUser || !receiverUser) return;
    if (senderUser.saldo < amountNum) {
      alert('Saldo tidak mencukupi!');
      return;
    }

    const prevBlock = blockchain[blockchain.length - 1];
    const newBlock = new Block(
      blockchain.length,
      prevBlock.hash,
      sender,
      receiver,
      amountNum,
    );

    const updatedUsers = users.map((user) => {
      if (user.name === sender)
        return { ...user, saldo: user.saldo - amountNum };
      if (user.name === receiver)
        return { ...user, saldo: user.saldo + amountNum };
      return user;
    });

    setUsers(updatedUsers);
    setBlockchain([...blockchain, newBlock]);
    setSender('');
    setReceiver('');
    setAmount('');
    validateBlockchain([...blockchain, newBlock]);
  };

  const validateBlockchain = (blocks) => {
    for (let i = 1; i < blocks.length; i++) {
      if (blocks[i].previousHash !== blocks[i - 1].hash) {
        setInvalidIndex(i);
        return;
      }
    }
    setInvalidIndex(null);
  };

  return (
    <div className='px-6 pt-25 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Blockchain Transaction History
      </h1>
      <div className='mb-4 p-4 border rounded peer-box'>
        <h2 className='text-lg font-semibold mb-2'>Informasi Pengguna</h2>
        <table className='w-full border-collapse border border-gray-400 mb-4'>
          <thead>
            <tr className='bg-gradient-to-r from-blue/20 to-white/10 backdrop-blur-lg border border-white/20'>
              <th className='border border-gray-400 p-2'>Nama</th>
              <th className='border border-gray-400 p-2'>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.pubkey} className='text-center'>
                <td className='border border-gray-400 p-2'>{user.name}</td>
                <td className='border border-gray-400 p-2'>{user.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className='text-lg font-semibold mb-2'>Tambah Transaksi</h2>
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className='p-2 border input-neon rounded mb-2 w-full'
        >
          <option value=''>Pilih Pengirim</option>
          {users.map((user) => (
            <option key={user.pubkey} value={user.name}>
              {user.name} (Saldo: {user.saldo})
            </option>
          ))}
        </select>
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className='p-2 border input-neon rounded mb-2 w-full'
        >
          <option value=''>Pilih Penerima</option>
          {users.map((user) => (
            <option key={user.pubkey} value={user.name}>
              {user.name} (Saldo: {user.saldo})
            </option>
          ))}
        </select>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Jumlah'
          className='p-2 border input-neon rounded mb-2 w-full'
        />
        <button
          onClick={addBlock}
          className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full'
        >
          Tambah Transaksi
        </button>
      </div>
      <div className='space-y-4'>
        {blockchain.map((block, index) => (
          <div
            key={index}
            className={`p-4 border rounded shadow peer-box ${
              invalidIndex === index ? 'border-red-500' : ''
            }`}
          >
            <p>
              <strong>Index:</strong> {block.index}
            </p>
            <p>
              <strong>Previous Hash:</strong> {block.previousHash}
            </p>
            <p>
              <strong>Hash:</strong> {block.hash}
            </p>
            <p>
              <strong>Nonce:</strong> {block.nonce}
            </p>
            <p>
              <strong>Sender:</strong> {block.sender}
            </p>
            <p>
              <strong>Receiver:</strong> {block.receiver}
            </p>
            <p>
              <strong>Amount:</strong> {block.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Distributed;
