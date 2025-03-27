import { calculateHash } from '../../lib/blockchain';
const handleInputChange = (index, field, value, setBlockchain) => {
    setBlockchain((prevBlockchain) => {
      const updateBlockchain =JSON.parse(JSON.stringify(prevBlockchain));
      const block = updateBlockchain[index];

      if (field === 'sender' || field === 'receiver' || field === 'amount') {
        block.data[field] = value;
      } else {
        block[field] = value;
      }

      block.hash = calculateHash(
        block.index,
        block.previousHash,
        block.data
      );
      return updateBlockchain;
    });
  };

export {handleInputChange}