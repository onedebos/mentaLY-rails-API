import React from 'react';
import { render } from 'react-dom';
import 'circular-std';
import App from '../components/App';
import Menu from '../components/Menu';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,

    document.body.appendChild(document.createElement('div')),
  );
});
