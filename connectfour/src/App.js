import React, {useEffect} from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux'
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import LoadingScreen from './screens/LoadingScreen';
import ReplayScreen from './screens/ReplayScreen';

function App() {
  const selectedScreen = useSelector(state => state.screen)
  
  const onSreenSelect = (screen) => {
    if(screen === 'game') {
     return 'game'
    }
    return 'replay'
  }

  const loadingType = onSreenSelect()

  useEffect(() => {
  }, [selectedScreen])

  const showScreen = () => {
    switch(selectedScreen) {
      case "menu":
        return <MenuScreen />
      
      case "game":
        return <GameScreen />

      case "loading":
        return <LoadingScreen type={loadingType} />

      case "replay":
        return <ReplayScreen />

      default:
        return <MenuScreen />
    }
  }

  const rootStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    color: 'white',
    height: '100vh',
    backgroundColor: '#7d978f',
  }

  return (
    <div className="App">
      <div style={rootStyle}>
        {showScreen()}
      </div>
    </div>
  );
}

export default App;
