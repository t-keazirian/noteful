import React from 'react';
import LIST from '../store';
import './folders.css';
import { NavLink } from "react-router-dom";

class Folders extends React.Component {
  render() {
    return (
      <div className='folders-container'>
        <ul>
          {LIST.folders.map(folder => 
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