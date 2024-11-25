'use client'

import React, { useEffect, useState } from 'react';
import CardGame from './components/CardGame'; 

const Page: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [games, setGames] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {

      const options = {
        method: 'GET',
        url: 'https://soccer-football-info.p.rapidapi.com/live/full/',
        params: {
          l: 'en_US',
          f: 'json',
          e: 'no',
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'soccer-football-info.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(options.url, {
          method: options.method,
          headers: options.headers
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }

        const data = await response.json();
        const liveGames = data.result; 
        setGames(liveGames); 
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData(); 
    const intervalId = setInterval(fetchData, 100000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex flex-col pt-5 bg-[##000524] text-center min-h-screen w-full'>
      <p className='font-bold'>{games.length} partidas ao vivo</p>
      <div id="games" className='flex justify-center flex-wrap mt-5'>
        {games.map((game, index) => (
           parseInt(game.timer.split(':')[0]) >= 0 &&
          <CardGame key={index} game={game}  />
        ))}
      </div>
    </div>
  );
};

export default Page;
