import React from 'react';
import { Route } from "react-router-dom";
import Folders from './Folders/Folders';
import Notes from './Notes/Notes';
import Main from './Main/Main';
import store from './store';
import './App.css';
import IndividualNote from './IndividualNote/IndividualNote';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store }
    // console.log(this.state.store)
  }

  render() {
    return (
      <div className='App'>
        <Route
          path='/'
          component={Main}
        />
        <div className='container'>
        <div className='item folders'>
          <Route
            exact path={['/', '/folder/:folderId']}
            component={Folders}
          />
        </div>
          <div className='item notes'>
          <Route 
            path='/note/:id'
            component={IndividualNote}
          />
          <Route
            exact path={['/folder/:folderId', '/']}
            component={Notes}
          />
          </div>
        </div>
      </div>
    )
  }
}

export default App;