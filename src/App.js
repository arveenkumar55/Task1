import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import DataAzuki from './Data/azukiVolAvgCount'
import kongxData from './Data/kongzVolAvgCount'
import Graph from './graph'

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function App() {

  const [daysCriteria, setDaysCriteria] = useState('all')

  const [ValueChecked, setValueChecked] = useState('volume')


  const setDays = (value) => {

    setDaysCriteria(value)
  }

  const seTcheckedvalue = (isChecked, col) => {

    setValueChecked(col)
  }

  let DataAzukiGraph = []
  let kongxDataGraph = []
  for (let i = 0; i < DataAzuki().length; i++) {

    if (daysCriteria === 'all') {

      DataAzukiGraph.push([new Date(DataAzuki()[i].day).getTime(), DataAzuki()[i][ValueChecked]])
    } else {

      let date1 = new Date(DataAzuki()[i].day);
      let date2 =  new Date();
      let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
      if (diffDays <= 31) {
          DataAzukiGraph.push([new Date(DataAzuki()[i].day).getTime(), DataAzuki()[i][ValueChecked]])
      }
    }
  }

  for (let i = 0; i < kongxData().length; i++) {

    if (daysCriteria === 'all') {

      kongxDataGraph.push([new Date(kongxData()[i].day).getTime(), kongxData()[i][ValueChecked]])

    } else {
      let date1 = new Date(kongxData()[i].day);
      let date2 =  new Date();
      let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);

      // console.log('diffDays', diffDays)
      if (diffDays <= 31) {
        kongxDataGraph.push([new Date(kongxData()[i].day).getTime(), kongxData()[i][ValueChecked]])
      }
    }
  }

  return (
    <div className="App">

      <ButtonGroup aria-label="outlined primary button group">
        <Button variant={daysCriteria === 'all' ? "contained" : 'outlined'} onClick={() => { setDays('all') }}>All time</Button>
        <Button variant={daysCriteria === '31Days' ? "contained" : 'outlined'} onClick={() => { setDays('31Days') }}>31 Days</Button>
      </ButtonGroup>

                    <FormControlLabel
                      control={<Checkbox
                        checked={ValueChecked === 'txCount' ? true : false}
                        onChange={(event) => { seTcheckedvalue(event.target.checked, 'txCount') }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="txCount"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        checked={ValueChecked === 'averageValue' ? true : false}
                        onChange={(event) => { seTcheckedvalue(event.target.checked, 'averageValue') }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Average Value"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        checked={ValueChecked === 'volume' ? true : false}
                        onChange={(event) => { seTcheckedvalue(event.target.checked, 'volume') }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />}
                      label="Volume"
                      labelPlacement="start"
                    />
      <Graph DataAzukiGraph={DataAzukiGraph} kongxDataGraph={kongxDataGraph} />
    </div>
  );
}

export default App;
