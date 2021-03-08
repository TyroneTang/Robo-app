import React, {Fragment} from "react";
import { Container } from "react-bootstrap";
import logo from './logo.svg';
import './App.css';
import Coordinates from "./Component/Coordinatebox/Coordinates";


function App() {
  return (
    <Fragment>
      <Container>
        <Coordinates/>
      </Container>
    </Fragment>
  );
}

export default App;
