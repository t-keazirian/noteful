import React from 'react';
import ApiContext from '../Context/ApiContext';
import config from '../config';
import './addnote.css';
import ValidationError from '../ValidationError/ValidationError';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
      content: {
        value: '',
        touched: false,
      },
      folder: {
        selected: '',
        value: 'none',
      }
    }
  }

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, content, folder } = this.state;
    const noteObject = {
      "note_name": name.value,
      "folder_id": folder.selected,
      "content": content.value
    }

    fetch(`${config.API_ENDPOINT}/api/notes`, {
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
        value: name,
        touched: true,
      }
    })
  }

  updateContent(content) {
    this.setState({
      content: {
        value: content,
        touched: true,
      }
    })
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        selected: folder,
        value: folder
      }
    })
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Your note must have a name.'
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return 'Your note must have content.'
    }
  }

  validateFolder() {
    const selected = this.state.folder.selected;
    const value = this.state.folder.value;
    if (selected === '' || value === 'none') {
      return 'You must select a folder'
    }
  }

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const folderError = this.validateFolder();
    const { folders =[] } = this.context;
    const foldersArray = folders.map(folder => <option key={folder.id} value={folder.id}>{folder.folder_name}</option>)

    return (
      <div className='new-note-container'>
        <h2>Create a new note</h2>
        <form 
          className='new-note-form'
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className='field'>
            <label 
              htmlFor='note-name-input'>
              Name:
            </label>
            <input 
              type='text' 
              id='note-name-input' 
              name='note-name-input' 
              aria-label='Name for new note' aria-required='true' 
              onChange={e=> this.updateName(e.target.value)}
              />
          
          {this.state.name.touched && (<ValidationError message={nameError} />)}
        
            <label 
              htmlFor='note-content-input'>
              Content:
            </label>
            <input 
              type='text'    
              id='note-content-input' name='note-content-input' 
              aria-label='Content for new note' aria-required='true' 
              onChange={e=> this.updateContent(e.target.value)}/>
              
            {this.state.content.touched && (<ValidationError message={contentError} />)}
        
            <label
              htmlFor='note-folder-select'>
              Folder:
            </label>
            <select 
              id='note-folder-select' 
              onChange={e => this.updateFolder(e.target.value)}
            >
              <option value='none'>Choose a folder</option>
              {foldersArray}
            </select>

        {this.state.folder.selected && (<ValidationError message={folderError} />)}
        
        </div>
        <div className='button-div'>
          <button 
            type='submit'
            className='note-submit-button'
            disabled={
              this.validateContent() || this.validateName() || this.validateFolder()
            }
          >
            Add Note</button>
        </div>
        </form>
      </div>
    )
  }
}

export default AddNote;