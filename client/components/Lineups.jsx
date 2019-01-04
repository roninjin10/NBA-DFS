import React from 'react';
import Lineup from './Lineup.jsx';

const Lineups = ({lineups}) => {
  console.log(lineups);
  const renderLineups = lineups.map((lineup) => 
    <Lineup 
      isEditable={false}
      lineup={lineup.lineup}
      points={lineup.points}
      salary={lineup.salary}
    />
  );

  return (
    <div>
      {renderLineups}
    </div>
  );
};

export default Lineups;