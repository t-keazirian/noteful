import React from 'react';
import './notes.css';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import ApiContext from '../Context/ApiContext';
import config from '../config';

class Notes extends React.Component {

  static contextType = ApiContext;

  handleClickDelete = (noteId) => {
    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }).then(() => {
      this.context.deleteNote(noteId);
    });
  }

  render() {
    const { notes=[] } = this.context;
    const note = notes.filter(n => {
      if (!this.props.match.params.folderId) {
        return true;
      } 
      return n.folder_id === parseInt(this.props.match.params.folderId);
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
                <h2>{note.note_name}</h2>
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