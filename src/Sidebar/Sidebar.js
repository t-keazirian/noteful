import React from 'react';
import { NavLink } from "react-router-dom";
import Folders from '../Folders/Folders';
import './sidebar.css';

class Sidebar extends React.Component {
  render() {
    return (
      <NavLink 
        to={`/folder/${this.state.folders.folderId}`} 
        activeClassName='selectedFolder'
      >
        {<Folders />}
      </NavLink>
    )
  }
}

export default Sidebar;