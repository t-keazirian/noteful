import React from 'react';
import LIST from '../store';
import './IndividualNote.css';
import Moment from 'react-moment';
import { withRouter } from "react-router-dom";

class IndividualNote extends React.Component {

  handleClickGoBack = () => {
    this.props.history.goBack();
  }

  render() {
    const oneNote = LIST.notes.find(note => note.id === this.props.match.params.id)

    const currentFolder = LIST.folders.find(folder => folder.id === oneNote.folderId)

    return (

      <article className='note-container'>
        <h2 className='folder-name'>{currentFolder.name}</h2>
        <div className='one-note'>
            <h2>{oneNote.name}</h2>
            <p>
                Modified{' '} 
                <Moment format='D MMM YYYY'>
                   {oneNote.modified}
                </Moment>
              </p>
            <p>{oneNote.content}</p>
        </div>
          <button
            type='button'
            className='back-button'
            onClick={this.handleClickGoBack}
            >
              Go Back
          </button>
      </article>
    )
  }
}

export default withRouter(IndividualNote);