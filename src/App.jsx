"use client";
import React, { useState, useEffect } from 'react';
import { BackgroundGradient } from "./components/ui/background-gradient.tsx"
import {cn} from "./utils/cn.ts";
import './index.css'; 

const catPhrases = [
  "Shitcoin to the meown!",
  "Meme cat madness!",
  "Rugpull cat-tastrophe!",
  "Rocket cat!",
  "Push for the meow!",
  "Bullrun cat!",
  "HODL the kitty!",
  "Diamond paws!",
  "Buy the catnip dip!",
  "Crypto cat king!",
  "Altcoin feline!",
  "Pump it, kitty!",
  "Bear market fur-real",
  "Whale cat watching",
  "Market cat-tility",
  "FOMO is purr-fect",
  "To the meown!",
  "Crypto cat frenzy!",
  "DeFi cat takeover!",
  "NFT kitty craze!",
  "Lambo cat dreams",
  "Satoshi's cat vision",
  "Blockchain cat revolution",
  "Crypto cat winter",
  "Digital cat gold",
  "HODL or meow?",
  "Tokenomics cat",
  "Decentralize every-cat-thing",
  "Bullish cat sentiment"
];



function App() {
  const [meme, setMeme] = useState({ imageUrl: '', phrase: '', width: 0, height: 0 });
  const [memeCount, setMemeCount] = useState(0);
  const [customText, setCustomText] = useState('');

  const generateMeme = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const randomPhrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
      
      // Create a new Image object to get the dimensions
      const img = new Image();
      img.onload = () => {
        setMeme({ 
          imageUrl: data[0].url, 
          phrase: randomPhrase,
          width: img.width,
          height: img.height
        });
      };
      img.src = data[0].url;
      
      setMemeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    generateMeme();
  }, []);

  return (

    <div className="min-h-screen flex overflow-hidden bg-slate-900 flex-col items-center justify-center p-4">
    <div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <BackgroundGradient className = "rounded-[22px] max-w-sm p4 sm:p-10 bg-white dark:bg-zinc900">
        {meme.imageUrl && (
          <div className="relative mb-6 overflow-hidden rounded-lg" style={{maxHeight: '70vh'}}>

            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Pow Cat Meme Generator</h1>
            <p className="text-center text-gray-600 mb-6">Create memes with just one click!</p>
            <img 
              src={meme.imageUrl} 
              alt="Random cat" 
              className="w-full h-auto object-contain"
              style={{maxHeight: '70vh'}}
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center text-2xl font-bold">
              {customText || meme.phrase}
            </p>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="customText" className="block text-sm font-medium text-gray-700 mb-2">
            Search meme + add text to your meme:
          </label>
          <input
            type="text"
            id="customText"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your own meme text"
          />
        </div>
        
        <button
          onClick={generateMeme}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 mb-4"
        >
          Generate New
        </button>
        
        <p className="text-center text-gray-600">
          Memes generated: <span className="font-bold">{memeCount}</span>
        </p>
        <div className="mt-6 flex gap-4">
  <a
    href="https://dexscreener.com/solana/dkrdnhpe9xncwf8vqr1gpzu1kokp7nshn6uvqsehsgxg"
                  target="_blank"
    className="flex flex-col items-center w-full max-w-[300px] bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300"
  >
    <i className="fas fa-chart-line fa-3x mb-2"></i>
    <span className="text-xl">Buy Now</span>
  </a>
  <a
    href="https://github.com/powcom"
                  target="_blank"
              rel="noopener noreferrer"
    className="flex flex-col items-center w-full max-w-[300px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300"
  >
    <i className="fab fa-github fa-3x mb-2"></i>
    <span className="text-xl">GitHub</span>
  </a>
</div>
<div className="mt-6 relative w-full" style={{paddingBottom: '125%'}}>
            <iframe
              src="https://dexscreener.com/solana/74RwVxoL498863AZtsWsyoZZoRWVqKx7LrxbezzKgjE4?embed=1&theme=dark&trades=0&info=0"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="DexScreener Embed"
            ></iframe>
          </div>
        </BackgroundGradient>
      </div>
      </div>
    </div>
  );
}

export default App;

