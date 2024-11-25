import React from 'react';
// import Image from 'next/image';
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface Team {
    name: string;
    score: Score;
    stats: Stats;
    perf: Perf;
}

interface Perf {
  l_5_matches: string;
}

interface Stats {
    attacks: Attacks;
    corners: Corners;
}

interface Corners {
    t: string;
}

interface Attacks {
    d: string;
}

interface Score {
    f: number;
}
  
  interface Championship {
    name: string;
    country: string;
  }

  interface Odds {
    kickoff: KickOff;
  }

  interface KickOff {
    '1X2': Bet365;
  }

  interface Bet365 {
    bet365: string;
  }
  
  interface CardGameProps {
    game: {
      championship: Championship;
      teamA: Team;
      teamB: Team;
      timer: string;
      odds: Odds;
    };
  }

  const CardGame: React.FC<CardGameProps> = ({ game }) => {

    const attacksTeamA = parseInt(game.teamA.stats.attacks.d);
    const attacksTeamB = parseInt(game.teamB.stats.attacks.d);

    const totalAttacks = attacksTeamA + attacksTeamB;

    const teamAAttacksPercentage = totalAttacks > 0 ? (attacksTeamA / totalAttacks) * 100 : 50;
    const teamBAttacksPercentage = totalAttacks > 0 ? (attacksTeamB / totalAttacks) * 100 : 50;

    const cornersTeamA = parseInt(game.teamA.stats.corners.t);
    const cornersTeamB = parseInt(game.teamB.stats.corners.t);

    const totalCorners = cornersTeamA + cornersTeamB;

    const teamACornersPercentage = totalCorners > 0 ? (cornersTeamA / totalCorners) * 100 : 50;
    const teamBCornersPercentage = totalCorners > 0 ? (cornersTeamB / totalCorners) * 100 : 50;

    const countryCode = game.championship.country.toLowerCase();

    const timeMatch = parseInt(game.timer.split(':')[0]);

    let oddTeamA = '';
    let oddTeamB = '';

    try {
      oddTeamA = game.odds.kickoff['1X2'].bet365['1'];
      oddTeamB = game.odds.kickoff['1X2'].bet365['2'];
    } catch (error) {
      console.log(error)
    }

    return (
      <div className="flex justify-center flex-col items-center w-10/12 sm:w-1/3 lg:w-1/5  rounded-lg pt-5 pb-5 m-2 font-sans" style={{ background: 'linear-gradient(180deg, rgba(36,34,34,1) 0%, rgba(24,24,24,1) 100%)' }}>
        <h3 id="league-name" className='font-bold text-sm'>{game.timer.split(':')[0]}´ {game.championship.name} {countryCode && <span className={`fi fi-${countryCode} ml-1`}></span>}</h3>
        <div id="teams" className="flex items-center justify-between w-full mt-5 bg-[url('/assets/background-score.png')] bg-cover bg-right bg-no-repeat p-5 h-1/2 cursor-pointer" onClick={() => {window.open(`https://www.bet365.com/#/AX/K%5E${game.teamA.name}%20${game.teamB.name}`)}}>
          <p id="team-a" className="flex-1 text-center mr-3">{game.teamA.name} {attacksTeamA/timeMatch >= 1 && ' 🔥'}</p>
          <div id="score" className="flex text-lg">
            <p id="score-team-a" className='pr-0.5'>{game.teamA.score.f}</p>
            <p>X</p>
            <p id="score-team-b" className='pl-0.5'>{game.teamB.score.f}</p>
          </div>
          <p id="team-b" className="flex-1 text-center ml-3">{game.teamB.name} {attacksTeamB/timeMatch >= 1 && ' 🔥'}</p>
        </div>

        <div id="stats-live" className='w-full pt-5'>
            <div id="attacks" className='flex flex-col items-center w-full'>
                <div id="attack" className='flex items-center'>
                    <p className='mr-2-'>Ataques Perigosos ⚔️</p>
                </div>
                <div id="graph-attacks" className='w-10/12 flex justify-center items-center'>
                    <p id="attacks-team-a" className={`mr-2 ${attacksTeamA/timeMatch >= 1 ? 'font-bold text-[#FF6723]' : ''}`}>
                      {game.teamA.stats.attacks.d ? game.teamA.stats.attacks.d : 0}
                      </p>
                    <div id="graphs" className='w-2/3 flex'>
                        <div className='bg-red-500 h-2' style={{ width: `${teamAAttacksPercentage}%` }}></div>
                        <div className='bg-blue-500 h-2' style={{ width: `${teamBAttacksPercentage}%` }}></div>
                    </div>
                    <p id="attacks-team-b" className={`ml-2 ${attacksTeamB/timeMatch >= 1 ? 'font-bold text-[#FF6723]' : ''}`}>
                      {game.teamB.stats.attacks.d ? game.teamB.stats.attacks.d : 0}
                      </p>
                </div>
            </div>
          <div id="corners" className='flex flex-col items-center w-full'>
            <div id="corners" className='flex items-center'>
              <p className='mr-2'>Escanteios ⛳️</p>
            </div>
            <div id="graph-corners" className='w-10/12 flex justify-center items-center'>
              <p id="corners-team-a" className='mr-2'>{game.teamA.stats.corners.t ? game.teamA.stats.corners.t : 0}</p>
              <div id="graphs" className='w-2/3 flex'>
                  <div className='bg-red-500 h-2' style={{ width: `${teamACornersPercentage}%`}}></div>
                  <div className='bg-blue-500 h-2' style={{ width: `${teamBCornersPercentage}%`}}></div>
              </div>
              <p id="corners-team-b" className='ml-2'>{game.teamB.stats.corners.t ? game.teamB.stats.corners.t : 0}</p>
            </div>
          </div>
        </div>

        <div id="stats" className='w-full mt-5'>
          <div id="odds">
            <p>Odds Pré Live 📈</p>
            <div className='flex justify-between pt-1'>
              <p className='w-1/2'>{oddTeamA}</p>
              <p className='text-[#625f5f]'>|</p>
              <p className='w-1/2'>{oddTeamB}</p>
            </div>
          </div>
            {game.teamA.perf.l_5_matches && game.teamB.perf.l_5_matches && 
            <div id="last-matches" className='mt-2'>
              <p>Últimas Partidas</p> 
              <div className=' flex justify-between mt-1 pt-1'>
              <div className='w-1/2'>
                {game.teamA.perf.l_5_matches.split('').map((char, index) => (
                  <span
                      key={index}
                      className={`px-1 text-black ${
                        char === 'L' ? 'bg-red-500' :
                        char === 'D' ? 'bg-gray-500' :
                        char === 'W' ? 'bg-green-500' : ''
                      }`}>
                    {char}
                  </span>
                ))}
                </div>
                <p className='text-[#625f5f]'>|</p>
                <div className='w-1/2'>
                {game.teamB.perf.l_5_matches.split('').map((char, index) => (
                  <span
                      key={index}
                      className={`px-1 text-black  ${
                        char === 'L' ? 'bg-red-500' :
                        char === 'D' ? 'bg-gray-500' :
                        char === 'W' ? 'bg-green-500' : ''
                      }`}>
                    {char}
                  </span>
                ))}
                </div>
              </div>
            </div>}  
        </div>

      </div>
    );
  };
  
  export default CardGame;
