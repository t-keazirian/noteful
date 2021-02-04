import React from 'react';

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addNote: () => {},
  addFolder: () => {},
})

export default ApiContext;