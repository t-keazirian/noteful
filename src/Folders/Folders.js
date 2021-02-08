import React from 'react';
import './folders.css';
import { Link, NavLink } from "react-router-dom";
import ApiContext from '../Context/ApiContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class Folders extends React.Component {

  static contextType = ApiContext;

  render() {
    const { folders=[] } = this.context;
    return (
      <div className='folders-container'>
      <ErrorBoundary>
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
        <Link
          to='/add-folder'
        >
          <button
          type='button'
          className='add-folder-btn'
          >
            Add Folder
          </button>
        </Link>
        <Link
          to='/add-note'
        >
            <button
              type='button'
              className='add-note-btn'
            >
              Add Note
            </button>
        </Link>
        </ErrorBoundary>
      </div>
    )
  }
}

export default Folders;