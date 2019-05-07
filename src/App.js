import React from 'react';
import 'antd/dist/antd.css'
import './App.css';
import Header from './components/shared/Header'
import Body from './components/shared/Body'
import SelectLevel from './containers/SelectLevel'
import Statistics from './containers/Statistics'
import Timer from './containers/Timer'
import Desk from './containers/Desk'
import IsCompleted from './containers/IsCompleted'

function App() {
  return (
    <div className="App">
      <Header>
        <SelectLevel />
        <div className="margin-top">
          <Statistics />
        </div>
      </Header>

      <Body>
        <Timer />
        <div className="margin-top">
          <Desk />
          <IsCompleted />
        </div>
      </Body>
    </div>
  );
}

export default App;
