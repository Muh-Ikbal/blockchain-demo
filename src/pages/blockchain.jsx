import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import Modal from '../components/modal';

class Block {
  constructor(index, previousHash, sender, receiver, amount, timestamp = null) {
    this.index = index;
    this.previousHash = previousHash;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = timestamp || new Date().toISOString();
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

function Tokens() {
  const [peers, setPeers] = useState([
    {
      id: 1,
      blockchain: [
        new Block(0, '0', 'System', 'User', 1000, '2025-01-01T00:00:00.000Z'),
      ],
    },
    {
      id: 2,
      blockchain: [
        new Block(0, '0', 'System', 'User', 1000, '2025-01-01T00:00:00.000Z'),
      ],
    },
    {
      id: 3,
      blockchain: [
        new Block(0, '0', 'System', 'User', 1000, '2025-01-01T00:00:00.000Z'),
      ],
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const addBlock = (sender, receiver, amount) => {
    if (sender === '' || receiver === '' || amount === null) {
      setIsOpen(false);
      alert('data tidak lengkap');
      return;
    }
    const timestamp = new Date().toISOString();
    setPeers(
      peers.map((peer) => {
        const lastBlock = peer.blockchain[peer.blockchain.length - 1];
        const newBlock = new Block(
          lastBlock.index + 1,
          lastBlock.hash,
          sender,
          receiver,
          parseFloat(amount),
          timestamp, // Gunakan timestamp yang sama di semua peer
        );
        return { ...peer, blockchain: [...peer.blockchain, newBlock] };
      }),
    );
    setIsOpen(false);
  };

  const editBlock = (peerId, index, sender, receiver, amount) => {
    setPeers(
      peers.map((peer) => {
        if (peer.id === peerId && index > 0) {
          const newBlockchain = [...peer.blockchain];
          const existingBlock = newBlockchain[index];
          newBlockchain[index] = new Block(
            index,
            newBlockchain[index - 1].hash,
            sender,
            receiver,
            amount,
            existingBlock.timestamp, // Menjaga timestamp tetap sama
          );
          return { ...peer, blockchain: newBlockchain };
        }
        return peer;
      }),
    );
  };

  const validatePeers = () => {
    const majorityChain = peers.reduce((acc, peer) => {
      const chainStr = JSON.stringify(peer.blockchain);
      acc[chainStr] = (acc[chainStr] || 0) + 1;
      return acc;
    }, {});

    const correctChain = Object.entries(majorityChain).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    if (correctChain) {
      setPeers(
        peers.map((peer) => ({
          ...peer,
          blockchain: JSON.parse(correctChain),
        })),
      );
    }
  };

  return (
    <div className='p-6 mx-auto pt-25'>
      <h1 className='text-xl font-bold mb-4'>Peer-to-Peer Blockchain</h1>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-green-500 text-white rounded mb-4 cursor-pointer'
      >
        Add Transaction
      </button>
      <button
        onClick={validatePeers}
        className='px-4 py-2 bg-blue-500 text-white rounded mb-4 ml-2'
      >
        Validate Blockchain
      </button>
      {isOpen && (
        <Modal className='z-50' setIsOpen={setIsOpen} addBlock={addBlock} />
      )}
      <div className='space-y-4'>
        {peers.map((peer) => (
          <div key={peer.id} className=' text-white peer-box '>
            <h2 className='peer-title'>Peer {peer.id}</h2>
            <div className='flex gap-3 overflow-x-auto'>
              {peer.blockchain.map((block, index) => {
                const isValid = peers.every(
                  (p) =>
                    JSON.stringify(p.blockchain[index]) ===
                    JSON.stringify(block),
                );
                return (
                  <div
                    key={index}
                    className={` w-[200px] text-white border rounded ${
                      isValid ? 'border-neon-blue' : 'border-neon-red'
                    }`}
                  >
                    <div className='bg-gradient-to-r px-2 rounded py-4 from-blue/20 to-white/10 backdrop-blur-lg border border-white/20 w-full z-20'>
                      <p>
                        <strong className='text-sm'>Index:</strong>{' '}
                        {block.index}
                      </p>
                    </div>
                    <div className='p-2 text-sm'>
                      <p>
                        <strong>Previous Hash:</strong>{' '}
                        <span className='text-xs break-all'>
                          {' '}
                          {block.previousHash}
                        </span>
                      </p>
                      <p>
                        <strong>Hash:</strong>
                        <span className='text-xs break-all'>{block.hash}</span>
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
                      {index !== 0 && (
                        <button
                          onClick={() => {
                            const sender = prompt('New Sender:');
                            const receiver = prompt('New Receiver:');
                            const amount = parseFloat(prompt('New Amount:'));
                            if (sender && receiver && !isNaN(amount)) {
                              editBlock(
                                peer.id,
                                index,
                                sender,
                                receiver,
                                amount,
                              );
                            }
                          }}
                          className='mt-2 px-3 py-1 bg-yellow-500 text-white rounded'
                        >
                          Edit Block
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tokens;
