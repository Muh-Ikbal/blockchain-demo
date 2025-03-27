import { SHA256 } from 'crypto-js';

function hashText(...data) {
  console.log(...data)
  return SHA256(...data).toString();
}

export default hashText;