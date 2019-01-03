import React from 'react';

const GamesBar = ({filters, games, filterGame}) => {
  games = Object.keys(games)
    .map((away) => {
      const home = games[away];
      const homeClass = filters.includes(home) ? 'filtered' : '';
      const awayClass = filters.includes(away) ? 'filtered' : '';
      return <Game 
        home={home}
        away={away}
        homeClass={homeClass}
        awayClass={awayClass}
        filterGame={filterGame}
      />
    });
  
    return (
    <div className="games-bar">
      {games}
    </div>
  )
};

const Game = ({home, away, homeClass, awayClass, filterGame}) => (
  <div className="games-bar">
    <button 
      onClick={() => filterGame(away)}
      className={ awayClass + " filter-button" }
    >
      {away}
    </button>
    <button 
      onClick={() => filterGame(home)}
      className={homeClass + " filter-button" }
    >
      {'@' + home}
    </button>
  </div>
)

export default GamesBar;