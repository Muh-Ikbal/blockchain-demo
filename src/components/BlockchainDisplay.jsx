import React from 'react';

function BlockchainDisplay({ blockchain }) {
  return (
    <div className='blockchain-display'>
      <h2>Blockchain ({blockchain.length} blocks)</h2>
      <div className='blocks-container'>
        {blockchain.map((block, index) => (
          <div key={index} className='block peer-box'>
            <div className='block-header'>
              <strong>Block #{block.index}</strong>
              <span className='timestamp'>
                {new Date(block.timestamp).toLocaleString()}
              </span>
            </div>
            <div className='block-info'>
              <p>
                <strong>Hash:</strong>{' '}
                <span className='hash'>{block.hash}</span>
              </p>
              <p>
                <strong>Previous Hash:</strong>{' '}
                <span className='prev-hash'>
                  {block.previousHash}
                </span>
              </p>
              <p>
                <strong>Nonce:</strong> {block.nonce}
              </p>
              <p>
                <strong>Mined by:</strong> {block.minedBy}
              </p>
            </div>
            <div className='transactions'>
              <h3>Transactions ({block.transactions.length})</h3>
              {block.transactions.map((tx, txIndex) => (
                <div key={txIndex} className='transaction peer-box'>
                  <p>From: {tx.sender}</p>
                  <p>To: {tx.recipient}</p>
                  <p>Amount: {tx.amount}</p>
                  <p>Time: {new Date(tx.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockchainDisplay;
