import React from 'react';
import LIST from '../store';
import './notes.css';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class Notes extends React.Component {
  render() {
    const note = LIST.notes.filter(n => {
      if (!this.props.match.params.folderId) {
        return true
      } 
      return n.folderId === this.props.match.params.folderId
    }
    )
      
    return (
      <div className='notes-container'>
        <ul className='list-container'>
          {note.map(note => 
            <li 
              key={note.id}
              className='notes-list'
            >
            <Link to={`/note/${note.id}`}>
              <h2>{note.name}</h2>
            </Link>
              <p>
                Modified{' '} 
                <Moment format='D MMM YYYY'>
                   {note.modified}
                </Moment>
              </p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Notes;

/*

if (LIST.folders.id === LIST.notes.folderId)



*/