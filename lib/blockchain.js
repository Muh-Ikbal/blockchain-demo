import { SHA256 } from 'crypto-js';

const calculateHash = (index, previousHash, data) => {
  // console.log(index,previousHash,timestamp,JSON.stringify(data))
  return SHA256(
    index + previousHash + JSON.stringify(data)
  ).toString();
};

const createBlock = (index, previousHash, data) => {
  const timestamp = new Date().toISOString();
  const hash = calculateHash(index, previousHash, data);
  return { index, previousHash, timestamp, data, hash };
};

const initializeBlockchain = () => {
  const genesisBlock = createBlock(0, '0', {
    sender: 'Genesis',
    receiver: 'System',
    amount: 0,
  });
  return JSON.parse(JSON.stringify([genesisBlock]));
};




export {calculateHash,initializeBlockchain,createBlock}