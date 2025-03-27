import React from 'react';

const Peer = ({ blockchain, namePeer, onChange ,setBlockchain}) => {
  return (
    <div className='blockchain-container overflow-x'>
      <h2>{namePeer}</h2>
      <div className='flex overflow-x-auto '>
        {blockchain.map((block, index) => (
          <div
            key={index}
            className='mx-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/20 p-6 shadow-xl text-wrap min-w-[500px] max-w-[500px] relative'
          >
            <div className='input flex flex-col gap-4'>
              <div className='grid grid-cols-4 gap-2 place-items-start'>
                <label htmlFor='input text-nowrap'>Block:</label>
                <div className='flex col-span-3 w-full'>
                  <div className='rounded-l-2xl py-2 px-4 bg-white/10 border border-white/10'>
                    #
                  </div>
                  <input
                    type='text'
                    id={`block-${index}`}
                    className=' w-full p-2 bg-white/20 rounded-r-lg border border-white/20'
                    defaultValue={block.index}
                    onChange={(e) => onChange(index, 'index', e.target.value,setBlockchain)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-4 gap-2 place-items-start'>
                <label htmlFor='input text-nowrap' className=''>
                  PrevHash:
                </label>
                <input
                  type='text'
                  id={`prev-hash-${index}`}
                  className='w-full col-span-3 p-2 bg-white/20 rounded-lg border border-white/20'
                  defaultValue={block.previousHash}
                  onChange={(e) =>
                    onChange(index, 'previousHash', e.target.value,setBlockchain)
                  }
                />
              </div>

              <div className='grid grid-cols-4 gap-2 place-items-start relative'>
                <label htmlFor='input'> Data:</label>
                <div className='col-span-3 h-64 w-full p-2 bg-white/20 rounded-lg border border-white/20 flex flex-col justify-center gap-4'>
                  <div className='grid grid-cols-12 '>
                    <div className='col-span-4'>sender</div>
                    <div>{'->'}</div>
                    <div className='col-span-4'>receiver</div>
                    <div>=</div>
                    <div className='col-span-2'>amount</div>
                  </div>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-4'>
                      <input
                        type='text'
                        id={`sender-${index}`}
                        defaultValue={block.data.sender}
                        onChange={(e) =>
                          onChange(index, 'sender', e.target.value,setBlockchain)
                        }
                        className='w-full p-2 bg-white/20 rounded-lg border border-white/20'
                      />
                    </div>
                    <div>{'->'}</div>
                    <div className='col-span-4'>
                      <input
                        type='text'
                        id={`receiver-${index}`}
                        defaultValue={block.data.receiver}
                        onChange={(e) =>
                          onChange(index, 'receiver', e.target.value,setBlockchain)
                        }
                        className='w-full p-2 bg-white/20 rounded-lg border border-white/20 '
                      />
                    </div>
                    <div>=</div>
                    <div className='col-span-2'>
                      <input
                        type='text'
                        id={`amount-${index}`}
                        defaultValue={block.data.amount}
                        onChange={(e) =>
                          onChange(index, 'amount', e.target.value,setBlockchain)
                        }
                        className='w-full p-2 bg-white/20 rounded-lg border border-white/20'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-4 gap-2 place-items-start'>
                <label htmlFor='input text-nowrap'>Hash:</label>
                <input
                  type='text'
                  id={`hash-${index}`}
                  className='col-span-3 w-full p-2 bg-white/20 rounded-lg border border-white/20'
                  value={block.hash}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peer;
