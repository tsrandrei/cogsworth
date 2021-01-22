import React, {Component} from 'react';
import Floor from './Floor/Floor';
import { Grid } from '@material-ui/core';
import { Socket } from 'phoenix';

class LightsDashboard extends Component{
  constructor(props){
    super()
    this.state = {
      floors: [
        {
          id: 1,
          name: 'First Floor',
          model: 'vallingby3_s_split_1.glb',
          zones: [],
          on: true,
          zonesLoaded: false
        },
        {
          id: 2,
          name: 'Second Floor',
          model: 'vallingby3_s_split_2.glb',
          zones: [],
          on: true,
          zonesLoaded: false
        },
        {
          id: 3,
          name: 'Attic',
          model: 'vallingby3_s_split_3.glb',
          zones: [],
          on: false,
          zonesLoaded: false
        },
      ],
    }

    let socket = new Socket("ws://localhost:4000/socket");
    socket.connect();
    this.channel = socket.channel("lights:all", {});
    this.channel.on("update:all", payload => {
      this.updateFloors(payload);
    }) 
  }

  updateFloorHandler = (lookupFloorId) => {
    const updatedFloors = this.state.floors;
    updatedFloors
      .filter((floor) => (lookupFloorId === floor.id ))
      .map((floor) => {
        floor.on = !floor.on
        floor.zones.map((zone) => {
          zone.on = floor.on;
          this.channel.push(`update:zone:${zone.id}`, {on: floor.on });
        });
      });

    this.setState({
      floors: updatedFloors
    })
  }

  updateZoneHandler = (lookupZoneId, eventType, eventValue) => {
    const updatedZones = this.state.floors;
    updatedZones
      .map((floor) => (floor.zones))
      .flat()
      .filter((zone) => (lookupZoneId === zone.id ))
      .map((zone) => {
        switch (eventType) {
          case "toggle":
            zone.on = !zone.on
            this.channel.push(`update:zone:${zone.id}`, {on: zone.on} );
            break;
          case "brightness":
            zone.brightness = eventValue;
            this.channel.push(`update:zone:${zone.id}`, {brightness: zone.brightness} );
            break;
          case "color":
            this.channel.push(`update:zone:${zone.id}`, {color: eventValue} );
            break;
        }
      
      });

    this.setState({
      zones: updatedZones
    })
  };
  
  updateFloors(payload) {
    let updatedFloors = this.state.floors;
    updatedFloors.forEach(floor => floor.zones = []);

    payload.data.map((zone) => {
      switch (zone.id) {
        case "2":
        case "3":
        case "6":
        case "7":
          updatedFloors[0].zones.push(zone);
          updatedFloors[0].zonesLoaded = true;
          this.setState({floors: updatedFloors});
          break;
        case "1":
          updatedFloors[2].zones.push(zone);
          updatedFloors[2].zonesLoaded = true;
          this.setState({floors: updatedFloors});
          break;
        case "4":
        case "5":
        case "9":
          updatedFloors[1].zones.push(zone);
          updatedFloors[1].zonesLoaded = true;
          this.setState({floors: updatedFloors});
          break;
      }
    });
  }

  componentDidMount() {
    this.channel.join()
      .receive("ok", response => { 
        console.debug("Channel joined", response) 
      })
  }

  render () {
    return (
      <Grid container>
        {this.state.floors.map((floor, index)=> (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <Floor
              id={floor.id}
              name={floor.name}
              model={floor.model}
              zones={floor.zones}
              on={floor.on}
              zonesLoaded={floor.zonesLoaded}
              onFixtureZoneUpdate={this.updateZoneHandler}
              updateFloor={this.updateFloorHandler}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default LightsDashboard;
