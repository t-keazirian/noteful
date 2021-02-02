import React from 'react';
import './folders.css';
import { NavLink } from "react-router-dom";
import ApiContext from '../Context/ApiContext';

class Folders extends React.Component {

  static contextType = ApiContext;

  render() {
    const { folders=[] } = this.context;
    return (
      <div className='folders-container'>
        <ul>
          {folders.map(folder => 
          <NavLink
            to={`/folder/${folder.id}`}
            activeClassName='selected-folder'
            key={folder.id}
          >
            <li 
              className='folder-list'
            >
              {folder.name}
            </li>
          </NavLink>
          )}
        </ul>
        <button
        type='button'
        className='add-folder-btn'
        >
          Add Folder
        </button>
      </div>
    )
  }
}

export default Folders;