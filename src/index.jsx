import React from 'react';
import ReactDOM from 'react-dom';
import Quilt from './components/quilt';

import './styles/index.css';
/**
 * Our main application
 */
const App = () => <div><Quilt width={1000} height={500} points={10} /></div>;

ReactDOM.render(<App />, document.getElementById('root'));
