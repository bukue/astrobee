import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { Astrobee } from './components/astrobee';
import { 
  CLOCKWISE, 
  COUNTER_CLOCKWISE, 
  SIDE_VIEW, 
  SIDE_VIEW_POS,
  TOP_VIEW,
  TOP_VIEW_POS
} from './constants/astrobee';

function Camera(props) {
  useFrame(({ camera }) => {
    camera.position.set(...props.position);
    camera.lookAt(...props.lookAt);

    camera.updateProjectionMatrix();
  });
  return null
}

function App() {
  const [direction, setDirection] = useState(CLOCKWISE);
  const [view, setView] = useState(SIDE_VIEW);
  const [position, setPosition] = useState(SIDE_VIEW_POS);

  const onClickDirection = () => {
    if(direction === CLOCKWISE){
      setDirection(COUNTER_CLOCKWISE);
    }else{
      setDirection(CLOCKWISE);
    }
  };

  const onClickView = () => {
    if(view === SIDE_VIEW){
      setView(TOP_VIEW);
      setPosition(TOP_VIEW_POS);
    }else{
      setView(SIDE_VIEW);
      setPosition(SIDE_VIEW_POS);
    }
  }

  return (
    <>
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <button onClick={onClickDirection}>
          {direction}
        </button>
        <button onClick={onClickView}>
          {view}
        </button>
      </div>
      <Canvas >
        <Camera position={position} lookAt={[0,0,0]}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Astrobee rotationDirection={direction}/>
      </Canvas>
    </>
  );
}

export default App;
