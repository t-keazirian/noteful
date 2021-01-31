import React from 'react';
import { Link } from "react-router-dom";
import './main.css';

class Main extends React.Component {
  render() {
    return (
      <div className='main'>
        <Link to='/'>
          <h1>Noteful</h1>
        </Link>
      </div>
    )
  }
}

export default Main;