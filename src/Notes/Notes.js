import React from 'react';
import './notes.css';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import ApiContext from '../Context/ApiContext';

class Notes extends React.Component {

  static contextType = ApiContext;

  handleClickDelete = (noteId) => {
        this.context.deleteNote(noteId);
  }

  render() {
    const { notes=[] } = this.context;
    const note = notes.filter(n => {
      if (!this.props.match.params.folderId) {
        return true;
      } 
      return n.folderId === this.props.match.params.folderId;
    });
      
    return (
      <div className='notes-container'>
        <ul className='list-container'>
          {note.map(note => 
            <li 
              key={note.id}
              className='notes-list'
            >
              <Link className="flex-full" to={`/note/${note.id}`}>
                <h2>{note.name}</h2>
              </Link>
              <div className="flex-full note-details">
                <span>
                  Modified{' '} 
                  <Moment format='D MMM YYYY'>
                    {note.modified}
                  </Moment>
                </span>
              <div className='button-div'>
                <button 
                  type='button'
                  className='delete-note-btn'
                  onClick={() => this.handleClickDelete(note.id)}
                >
                  Delete Note
                </button>
              </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Notes;