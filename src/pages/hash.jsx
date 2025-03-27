import React from 'react';
import hashText from '../../lib/hasing';

const hash = () => {
  return (
    <div id='' className='text-white pt-25 flex justify-center'>
      <div className=' peer-box w-[75%]'>
        <h1 className='font-extrabold mb-6 peer-title'>Hash SHA256</h1>
        <div className='input flex flex-col gap-4'>
          <div className='flex justify-start gap-5'>
            <label htmlFor='input'>Data:</label>
            <textarea
              name=''
              id=''
              className='w-full h-64 p-2 input-neon'
              placeholder='input here ... '
              onChange={(e) => {
                const hash = hashText(e.target.value);
                document.getElementById('input').value = hash;
              }}
            ></textarea>
          </div>
          <div className='flex justify-start gap-4'>
            <label htmlFor='input text-nowrap'>Hash:</label>
            <input
              type='text'
              id='input'
              className=' w-full p-2 input-neon'
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default hash;
