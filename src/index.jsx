import React from 'react';
import ReactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import _ from 'lodash';

import Quilt from './components/quilt';

import './styles/index.css';

require('es6-promise').polyfill();

/**
 * Our main application
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      linePoints: null
    };

  }
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    fetchJsonp('http://noise.shora.net/noise/100/1?octaveCount=4', {
      jsonpCallback: 'jsonp'
    })
    .then(response => response.json())
    .then(noise => {
      const { width, height } = this.state;
      const step = width / noise.length;
      this.setState({
        linePoints: _.flattenDepth(_.range(0, width, step)
          .map((d, i) => [[d, noise[i] * height], [d + (0.05 * height), (noise[i] - 0.05) * height]])
        , 1)
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  }
  render() {
    const { width, height, linePoints } = this.state;

    const points = _.range(0, 1, 1 / 100)
      .map(d =>  [_.random(0, 1, true) * width, _.random(0, 1, true) * height]);

    // <Quilt width={width} height={height} points={points} divisions={18} />
    // <Quilt width={width} height={height} points={points} divisions={36} />
    // { linePoints && <Quilt width={width} height={height} points={linePoints} divisions={5} /> }
    // { linePoints && <Quilt width={width} height={height} points={linePoints} divisions={12} /> }
    if (width) {
      return (
        <div className='app'>
          <Quilt width={width} height={height} points={points} divisions={12} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
