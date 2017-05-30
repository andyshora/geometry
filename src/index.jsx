import React from 'react';
import ReactDOM from 'react-dom';
import Quilt from './components/quilt';

import './styles/index.css';
/**
 * Our main application
 */
const App = () => <div><Quilt width={500} height={500} points={120} /></div>;

ReactDOM.render(<App />, document.getElementById('root'));
