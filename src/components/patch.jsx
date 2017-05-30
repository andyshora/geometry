// Imports

import React from 'react';

import { TweenMax } from 'gsap';

/**
 * Get mid-point between two points
 * @type {object}
 */
const midPoint = (a, b, perc = 0.5) => {
  return [
    a[0] + ((b[0] - a[0]) * perc),
    a[1] + ((b[1] - a[1]) * perc)
  ];
};
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
  // componentDidMount() {
  //   TweenMax.to(this.rect, 2, {width: 100});
  // }
  /**
   * render - render the component
   * @return {ReactElement} markup
   */
  render() {
    const { a, b, c } = this.state;
    const { width, height, color, fill } = this.props;
    // const pathData = `M ${width * a[0]} ${height * a[1]}
    //   L ${width * b[0]} ${height * b[1]}
    //   L ${width * c[0]} ${height * c[1]}`;
    const mid = midPoint(b, c);
    const origin = `M ${width * a[0]} ${height * a[1]}`;
    const lines = 12;

    const midPoints = _.times(lines - 2, i => {
      const perc = (i / (lines - 2));
      const p = midPoint(b, c, perc);
      return `${origin} L ${width * p[0]} ${height * p[1]}`;
    });

    const pathData = `${origin}
      L ${width * b[0]} ${height * b[1]}
      ${midPoints.join(' ')}
      ${origin}
      L ${width * c[0]} ${height * c[1]}
      L ${width * b[0]} ${height * b[1]}`;

    return (
      <g className='patch' ref={_patch => { this.patch = _patch; }} transform='translate(0,0)'>
        <path stroke={color} fill='none' d={pathData} />
      </g>
    );
  }
}

export default Patch;
