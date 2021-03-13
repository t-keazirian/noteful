import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AddFolder from './AddFolder';

describe('Add Folder tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddFolder />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<AddFolder />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })
})