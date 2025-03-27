import React from 'react';
import blockImage from '../assets/image/block.png';
import char1 from '../assets/image/char1.png';
import char2 from '../assets/image/char2.png';
import char3 from '../assets/image/char3.png';
import char4 from '../assets/image/char4.png';
import char5 from '../assets/image/char5.png';
import char6 from '../assets/image/char6.png';
import char7 from '../assets/image/char7.png';
import char8 from '../assets/image/char8.png';
import char9 from '../assets/image/char9.png';
import char10 from '../assets/image/char10.png';
import blockChain from '../assets/image/blockchain.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { easeInOut, motion } from 'framer-motion';
import { useState } from 'react';

const Home = () => {
  // const [displayName, setDisplayName] = useState(false);
  return (
    <div className='text-white px-3 pt-25'>
      {/* hero section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center '>
        <div className='px-4'>
          <h1 className='text-xl md:text-4xl font-bold peer-title'>
            Blockchain Demo Transactions
          </h1>
          <p className='text-lg mt-4'>
            ini adalah contoh website transaksi blockchain sederhana. Anda dapat
            membuat hash, membuat blok, dan mendistribusikan blok ke jaringan.
            Untuk informasi lebih lanjut, silakan kunjungi link github dibawah
            ini
          </p>
          <div className='mt-8'></div>
          <a
            href='https://github.com/Muh-Ikbal/blockchain-demo'
            className='px-4 my-2 py-2 bg-linear-to-r button-neon hover:'
          >
            Source Code
            <FontAwesomeIcon icon={faGithub} className='ml-2' />
          </a>
        </div>
        <motion.img
          src={blockImage}
          alt='block'
          className='md:max-w-[600px] '
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
        />
      </div>
      {/* end hero section */}
      {}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        className='mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center '
      >
        <div>
          <h2 className='text-2xl font-bold peer-title'>Apa itu Blockchain?</h2>
          <p className='mt-4'>
            Blockchain adalah sistem terdesentralisasi yang digunakan untuk
            merekam transaksi secara aman dan permanen. Ini terdiri dari
            serangkaian blok yang saling terhubung, di mana setiap blok berisi
            sejumlah transaksi. Salah satu fitur kunci dari blockchain adalah
            bahwa data yang disimpan di dalamnya tidak dapat diubah atau
            dimanipulasi, menjadikannya sistem yang aman dan transparan.
          </p>
        </div>
        <div>
          <img src={blockChain} className='md:max-w-[600px]' />
        </div>
      </motion.div>
      <div className='flex flex-col items-center mt-8'>
        <h2 className='text-2xl font-bold peer-title'>
          Bagaimana Blockchain Bekerja?
        </h2>
        <p className='my-8 text-center px-4'>
          Blockchain adalah teknologi yang memungkinkan transaksi digital
          dicatat secara aman, transparan, dan tidak dapat diubah. Setiap
          transaksi yang terjadi akan diverifikasi oleh jaringan sebelum
          ditambahkan ke dalam blok baru. Blok-blok ini kemudian terhubung satu
          sama lain membentuk rantai (chain), yang menjadikannya sistem yang
          sangat aman dari manipulasi. Untuk lebih memahami bagaimana blockchain
          bekerja, simak video penjelasan berikut ini:
        </p>
        <iframe
          className='w-full md:max-w-[800px]'
          height='450'
          src='https://www.youtube.com/embed/EoSUwyAvxnw?si=L2AxyECBzfvCs5BV'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
        ></iframe>

        <div className='mt-8'></div>
        <a
          href='https://github.com/Ethereum-Jakarta/fullstack-web3-roadmap/tree/main'
          className='px-4 my-2 py-2 bg-linear-to-r button-neon hover:'
        >
          Bacaan Lebih Lanjut
        </a>
      </div>

      {/* <div className='mt-2 '>
        <h1 className='peer-title text-2xl font-bold text-center'>Our Teams</h1>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          <img src={char1} className='w-35' alt='' />
          <img src={char10} className='w-35' alt='' />
          <img src={char3} className='w-35' alt='' />
          <img src={char4} className='w-35' alt='' />
          <img src={char5} className='w-35' alt='' />
          <img src={char6} className='w-35' alt='' />
          <img src={char7} className='w-35' alt='' />
          <img
            src={char8}
            className='w-35 rounded-full mx-auto transition-transform duration-300 hover:scale-110'
            alt=''
          />
          <div className='relative'>
            <img
              src={char9}
              className='w-35 grayscale hover:grayscale-0'
              onMouseEnter={() => setDisplayName(true)}
              onMouseLeave={() => setDisplayName(false)}
              style={{
                transition: 'all 0.5s',
              }}
              alt=''
            />
            <div
              className={`absolute text-outline p-2 rounded-lg top-0 left-0 ${
                displayName ? 'block' : 'hidden'
              }`}
            >
              <p className='peer-title '>
                Muh. Ikbal
                <br />
                E1E122066
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
