import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';

class Block {
  constructor(index, previousHash, sender, receiver, amount) {
    this.index = index;
    this.previousHash = previousHash;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = new Date().toISOString();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        this.sender +
        this.receiver +
        this.amount,
    ).toString();
  }
}

function Blockchain() {
  const [blockchain, setBlockchain] = useState([
    new Block(0, '0', 'System', 'User', 1000),
  ]);
  const [invalidIndex, setInvalidIndex] = useState(null);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSender, setEditedSender] = useState('');
  const [editedReceiver, setEditedReceiver] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  const addBlock = () => {
    if (!sender || !receiver || !amount) return;
    const prevBlock = blockchain[blockchain.length - 1];
    const newBlock = new Block(
      blockchain.length,
      prevBlock.hash,
      sender,
      receiver,
      parseFloat(amount),
    );
    setBlockchain([...blockchain, newBlock]);
    setSender('');
    setReceiver('');
    setAmount('');
    validateBlockchain([...blockchain, newBlock]);
  };

  const editBlock = (index) => {
    setEditingIndex(index);
    setEditedSender(blockchain[index].sender);
    setEditedReceiver(blockchain[index].receiver);
    setEditedAmount(blockchain[index].amount);
  };

  const saveBlock = (index) => {
    const newBlockchain = [...blockchain];
    newBlockchain[index].sender = editedSender;
    newBlockchain[index].receiver = editedReceiver;
    newBlockchain[index].amount = parseFloat(editedAmount);
    newBlockchain[index].hash = newBlockchain[index].calculateHash();
    setBlockchain(newBlockchain);
    setEditingIndex(null);
    validateBlockchain(newBlockchain);
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

  const fixBlockchain = () => {
    const newBlockchain = [...blockchain];
    for (let i = 1; i < newBlockchain.length; i++) {
      newBlockchain[i].previousHash = newBlockchain[i - 1].hash;
      newBlockchain[i].hash = newBlockchain[i].calculateHash();
    }
    setBlockchain(newBlockchain);
    setInvalidIndex(null);
  };

  return (
    <div className='px-6 pt-25 mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Blockchain Transaction History</h1>
      <input
        type='text'
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        placeholder='Sender'
        className='p-2 border input-neon rounded mb-2 w-full'
      />
      <input
        type='text'
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder='Receiver'
        className='p-2 border rounded input-neon mb-2 w-full'
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount'
        className='p-2 border input-neon rounded mb-2 w-full'
      />
      <button
        onClick={addBlock}
        className='px-4 py-2 button-neon text-white rounded mb-4'
      >
        Add Transaction
      </button>
      {invalidIndex !== null && (
        <button
          onClick={fixBlockchain}
          className='px-4 py-2 bg-red-500 text-white rounded mb-4 ml-4'
        >
          Fix Blockchain
        </button>
      )}
      <div className='space-y-4 flex overflow-x-auto gap-3 peer-box p-3'>
        {blockchain.map((block, index) => (
          <div
            key={index}
            className={` w-[200px] text-white border rounded ${
              invalidIndex !== null && index >= invalidIndex
                ? 'border-neon-red'
                : 'border-neon-blue'
            }`}
          >
            <div className='bg-gradient-to-r px-2 rounded py-4 from-blue/20 to-white/10 backdrop-blur-lg border border-white/20 w-full'>
              <p>
                <strong className='text-sm'>Index:</strong> {block.index}
              </p>
            </div>
            <div className='px-2 py-2'>
              <p>
                <strong className='text-sm '>Previous Hash:</strong>{' '}
                <span className='text-xs break-all'> {block.previousHash}</span>
              </p>
              <p>
                <strong className='text-sm'>Hash:</strong>{' '}
                <span className='text-xs break-all'>{block.hash}</span>
              </p>
              {editingIndex === index ? (
                <>
                  <input
                    type='text'
                    value={editedSender}
                    onChange={(e) => setEditedSender(e.target.value)}
                    className='p-2 border rounded mb-2 w-full'
                  />
                  <input
                    type='text'
                    value={editedReceiver}
                    onChange={(e) => setEditedReceiver(e.target.value)}
                    className='p-2 border rounded mb-2 w-full'
                  />
                  <input
                    type='number'
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className='p-2 border rounded mb-2 w-full'
                  />
                  <button
                    onClick={() => saveBlock(index)}
                    className='mt-2 px-3 py-1 bg-green-500 text-white rounded'
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>
                    <strong className='text-sm'>Sender:</strong>{' '}
                    <span className='text-xs'>{block.sender}</span>
                  </p>
                  <p>
                    <strong className='text-sm'>Receiver:</strong>{' '}
                    <span className='text-xs'>{block.receiver}</span>
                  </p>
                  <p>
                    <strong className='text-sm'>Amount:</strong>{' '}
                    <span className='text-xs'>{block.amount}</span>
                  </p>
                  {index !== 0 && (
                    <button
                      onClick={() => editBlock(index)}
                      className='mt-2 px-3 py-1 bg-yellow-500 text-white rounded'
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blockchain;
