// EnchantmentCard.tsx — Final with Image Background and Flip
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENCHANTMENTS = [
  'UNSTOPPABLE FORCE:\nPERFORM ONE EXTRA ACTION PER TURN',
  'CRITICAL STRIKE:\nPERFORM A FREE ATTACK AFTER EACH CC ATTACK',
  // Add more as needed
];

const DISMANTLE_MATERIALS = [
  'Bloodiron', 'Bombastium', 'Chronoton', 'Darkinium', 'Draconian Ferite', 'Element 99',
  'Entropium', 'Fyrite', 'Kerocyte', 'Oriculus', 'Pandemonic Silver', 'Trilitium', 'Xithricite'
];

const MATERIAL_TYPES = [
  'Smithing Material', 'Crafting Material', 'Building Material', 'Repair Material', 'Magic Material', 'Upgrade Material'
];

const LATIN_WORDS = ['Barbaru', 'Corrus', 'Arcanum', 'Fortis', 'Tenebris', 'Ignis', 'Lunaris', 'Nox', 'Vita', 'Umbra'];

export default function EnchantmentCard() {
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const getRandomCard = () => {
    const enchant = ENCHANTMENTS[Math.floor(Math.random() * ENCHANTMENTS.length)];
    setHistory(prev => [...prev.slice(0, index + 1), enchant]);
    setIndex(prev => prev + 1);
    setFlip(true);
    setTimeout(() => setFlip(false), 600);
  };

  const currentRaw = history[index] || ENCHANTMENTS[Math.floor(Math.random() * ENCHANTMENTS.length)];
  const current = currentRaw.toUpperCase();

  const dismantle1 = `${[5,10,15,20,25][Math.floor(Math.random()*5)]} Pieces of ${MATERIAL_TYPES[Math.floor(Math.random()*MATERIAL_TYPES.length)]}`;
  const dismantle2 = `${[5,10,15,20,25][Math.floor(Math.random()*5)]} Pieces of ${DISMANTLE_MATERIALS[Math.floor(Math.random()*DISMANTLE_MATERIALS.length)]}`;
  const value = `${[100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500][Math.floor(Math.random()*17)]}`;
  const slots = [1,2,3][Math.floor(Math.random()*3)];
  const category = `${LATIN_WORDS[Math.floor(Math.random()*LATIN_WORDS.length)]} ${LATIN_WORDS[Math.floor(Math.random()*LATIN_WORDS.length)]}`.toUpperCase();

  const [title, ...effectLines] = current.split('\n');

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-[#fcefb2] font-[Cinzel] p-6">
      <h2 className="text-xl mb-2 tracking-widest">ENCHANTMENT</h2>
      <p className="text-sm uppercase text-[#fcefb2]/70 tracking-wider mb-4">{category}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current + index + (flip ? '-flipped' : '')}
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[360px] h-[540px] bg-cover bg-center border-4 border-[#8b5e3c] rounded-xl shadow-2xl relative flex flex-col justify-between"
          style={{ backgroundImage: 'url(/card_back.png)' }}
        >
          <div className="px-6 py-6 text-center">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{title}</h3>
            <p className="text-sm leading-snug tracking-wide whitespace-pre-wrap">
              {effectLines.join('\n')}
            </p>
          </div>

          <div className="text-sm leading-6 bg-black/60 px-6 py-4 rounded-b-xl">
            <div className="border-t border-yellow-800 pt-2">
              <p className="tracking-wide text-xs">SLOTS REQUIRED</p>
              <p className="text-md font-semibold">{slots}</p>
            </div>
            <div className="mt-4">
              <p className="tracking-wide text-xs">DISMANTLE</p>
              <p className="text-sm">{dismantle1}</p>
              <p className="text-sm">{dismantle2}</p>
            </div>
            <div className="mt-4">
              <p className="tracking-wide text-xs">VALUE</p>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs uppercase">Gold Pieces</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex space-x-4 mt-6">
        <button
          className="px-4 py-2 border border-yellow-400 hover:bg-yellow-900 rounded"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
        >Previous</button>
        <button
          className="px-4 py-2 border border-yellow-400 hover:bg-yellow-900 rounded"
          onClick={() => getRandomCard()}
        >New Card</button>
        <button
          className="px-4 py-2 border border-yellow-400 hover:bg-yellow-900 rounded"
          onClick={() => alert('Send to friend via Google Chat')}
        >Send</button>
      </div>
    </div>
  );
}
