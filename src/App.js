import React from 'react';
import { Route } from "react-router-dom";
import Folders from './Folders/Folders';
import Notes from './Notes/Notes';
import Main from './Main/Main';
import './App.css';
import IndividualNote from './IndividualNote/IndividualNote';
import ApiContext from './Context/ApiContext';
import config from './config';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      notes: [],
      folders: []
     }
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
    .then(([notesResponse, foldersResponse]) => {
      if (!notesResponse.ok) 
        return notesResponse.json().then(error => console.log(error));
      if (!foldersResponse.ok) 
        return foldersResponse.json().then(error => console.log(error));

      return Promise.all([notesResponse.json(), foldersResponse.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({notes, folders});
    }) 
    .catch(error => {
      console.log(error);
    })
  }
  
  handleDeleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({notes: newNotes});
  }

  handleAddNote = (newNote) => {
    this.setState({
      notes: [...this.state.notes, newNote]
    }) 
  } 

  handleAddFolder = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder
    }
    return (
      <ApiContext.Provider 
        value={contextValue}>
        <div className='App'>
          <div className='main-header'>
            <ErrorBoundary>
              <Route
                path='/'
                component={Main}
              />
            </ErrorBoundary>
          </div>
          <div className='container'>
            <div className='folders'>
              <ErrorBoundary>
                <Route
                  exact path={['/', '/folder/:folderId']}
                  component={Folders}
                />
              </ErrorBoundary>
            </div>
            <div className='notes'>
              <ErrorBoundary>
                <Route 
                  path='/note/:id'
                  component={IndividualNote}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <Route 
                  path='/add-note'
                  component={AddNote}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <Route 
                  path='/add-folder'
                  component={AddFolder}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <Route
                  exact path={['/folder/:folderId', '/']}
                  component={Notes}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App;