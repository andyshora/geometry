import React from 'react';
import ReactDOM from 'react-dom';
import Quilt from './components/quilt';

import './styles/index.css';
/**
 * Our main application
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  render() {
    const { width, height } = this.state;
    console.log(width, height);
    if (width) {
      return <div className='app'><Quilt width={width} height={height} points={300} divisions={18} /></div>;
    } else {
      return <div />;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
