import React from 'react';
import './IndividualNote.css';
import Moment from 'react-moment';
import { withRouter } from "react-router-dom";
import ApiContext from '../Context/ApiContext';
import config from '../config';

class IndividualNote extends React.Component {

  static contextType = ApiContext;

  handleClickGoBack = () => {
    this.props.history.goBack();
  }

  handleClickDelete = () => {
    fetch(`${config.API_ENDPOINT}/api/notes/${this.props.match.params.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }).then(() => {
      this.props.history.push('/');
      this.context.deleteNote(this.props.match.params.id);
    });
  }
    
    render() {
    const { notes=[], folders=[] } = this.context;

    const oneNote = notes.find(note => note.id === parseInt(this.props.match.params.id))

    const currentFolder = folders.find(folder => folder.id === oneNote.folder_id)

    return (

      <article className='note-container'>
        <button
          type='button'
          className='back-button'
          onClick={this.handleClickGoBack}
        >
          Go Back
        </button>
        { (notes.length > 0)
          ? <div>
              <h2 className='folder-name'>{currentFolder.name}</h2>
              <div className='one-note'>
                <h2>{oneNote.note_name}</h2>
                <p className='modified-date'>
                  Modified{' '} 
                  <Moment format='D MMM YYYY'>
                    {oneNote.modified}
                  </Moment>
                </p>
                <p className='content'>
                  {oneNote.content}</p>
                <div className='button-div'>
                <button 
                  type='button'
                  className='delete-btn'
                  onClick={this.handleClickDelete}
                >
                  Delete Note
                </button>
              </div>
              </div>
            </div>
          : <div>Loading...</div>
        }
      </article>
    )
  }
}

export default withRouter(IndividualNote);