// Imports

import React from 'react';

import { TweenMax } from 'gsap';
/**
 * Description
 */
class Patch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: props.vertices[0],
      b: props.vertices[1],
      c: props.vertices[2]
    };
  }
  componentDidMount() {
    TweenMax.to(this.rect, 2, {width: 100});
  }
  /**
   * render - render the component
   * @return {ReactElement} markup
   */
  render() {
    const { a, b, c } = this.state;
    const { width, height } = this.props;
    const pathData = `M ${width * a[0]} ${height * a[1]}
      L ${width * b[0]} ${height * b[1]}
      L ${width * c[0]} ${height * c[1]}`;
    return (
      <g className='patch' ref={_patch => { this.patch = _patch; }} transform='translate(0,0)'>
        <path stroke='black' fill='none' d={pathData} />
      </g>
    );
  }
}

export default Patch;
