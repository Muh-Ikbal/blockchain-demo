import React from 'react';

function BlockchainDisplay({ blockchain }) {
  return (
    <div className='blockchain-display'>
      <h2>Blockchain ({blockchain.length} blocks)</h2>
      <div className='flex gap-3 overflow-x-auto p-3'>
        {blockchain.map((block, index) => (
          <div key={index} className='block min-w-[300px] peer-box'>
            <div className='block-header'>
              <strong>Block #{block.index}</strong>
              <span className='timestamp'>
                {new Date(block.timestamp).toLocaleString()}
              </span>
            </div>
            <div className='block-info'>
              <p>
                <strong>Hash:</strong>{' '}
                <span className='hash text-xs break-all'>{block.hash}</span>
              </p>
              <p>
                <strong>Previous Hash:</strong>{' '}
                <span className='prev-hash break-all'>
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
              <ul class='list-disc list-inside ml-2 text-sm'>
                {block.transactions.map((tx, txIndex) => (
                  <li key={txIndex}>
                    from : {tx.sender} {'->'} {tx.recipient} {`(${tx.amount})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockchainDisplay;
