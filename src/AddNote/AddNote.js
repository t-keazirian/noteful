import React from 'react';
import ApiContext from '../Context/ApiContext';
import config from '../config';
import './addnote.css';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: ''
      },
      content: {
        value: ''
      },
      folder: {
        selected: ''
      }
    }
  }

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, content, folder } = this.state;
    const noteObject = {
      "name": name.value,
      "folderId": folder.selected,
      "content": content.value
    }

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(noteObject),
      }).then((res) => res.json())
        .then(resJson => {
      this.context.addNote(resJson);
      this.props.history.push('/');
    })
  }

  updateName(name) {
    this.setState({
      name: {
        value: name
      }
    })
  }

  updateContent(content) {
    this.setState({
      content: {
        value: content
      }
    })
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        selected: folder
      }
    })
  }

  render() {
    const { folders =[] } = this.context;
    const foldersArray = folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)
    // console.log(folders)

    return (
      <div className='new-note-container'>
        <h2>Create a new note</h2>
        <form 
          className='new-note-form'
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className='field'>
            <label htmlFor='note-name-input'>Name:</label>
            <input type='text' id='note-name-input' name='note-name-input' onChange={e=> this.updateName(e.target.value)}/>
          
        
            <label htmlFor='note-content-input'>Content:</label>
            <input type='text' id='note-content-input' name='note-content-input' onChange={e=> this.updateContent(e.target.value)}/>
        
            <label htmlFor='note-folder-select'>Folder:</label>
            <select id='note-folder-select' onChange={e => this.updateFolder(e.target.value)}>
              <option value='none'>Choose a folder</option>
              {foldersArray}
            </select>
        
        </div>
        <div className='button-div'>
          <button 
            type='submit'
            className='note-submit-button'
          >
            Add Note</button>
        </div>
        </form>
      </div>
    )
  }
}

  // AddNote.propTypes = {

  // }

export default AddNote;