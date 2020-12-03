import React from 'react';
import Zone from './Zone';

export default function ZoneList(props){
  return (
    <React.Fragment>
      {props.fixtures.map((fixture, index)=>(
        <Zone
          fixture={fixture}
          key={index}
          onFixtureZoneUpdate={props.onFixtureZoneUpdate} 
        />
      ))}
    </React.Fragment>
  )
}
