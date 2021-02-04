import React from 'react';
import ApiContext from '../Context/ApiContext';
import config from '../config';
import './addfolder.css';

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        value: ''
      }
    }
  }

  static contextType = ApiContext;

  handleSubmit = (event) => {
    event.preventDefault();
    const { folder } = this.state;
    const folderObject = {
      "name": folder.value
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folderObject),
      }).then((res) => res.json())
        .then(resJson => {
      this.context.addFolder(resJson);
      this.props.history.push('/');
    })
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        value: folder
      }
    })
  }

  render() {
   
    return (
      <div className='new-folder-container'>
        <h2>Create a new folder:</h2>
        <form className='new-folder-form' onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>Folder Name:</label>
            <input type='text' id='folder-name-input' name='folder-name-input' onChange={e => this.updateFolder(e.target.value)}/>
          </div>
          <div className='button-div'>
            <button type='submit' className='folder-submit-button'
            >Add Folder</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddFolder;