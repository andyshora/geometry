// Imports

import React from 'react';

import { Quad, TweenLite } from 'gsap';

/**
 * Get the mid-point between two points
 * @type {object}
 */
const getMidPoint = (a, b, perc = 0.5) => {
  return [
    a[0] + ((b[0] - a[0]) * perc),
    a[1] + ((b[1] - a[1]) * perc)
  ];
};
/**
 * Get the distance between two points
 * @type {number}
 */
const getDistance = (a, b) => {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
};
/**
 * Description
 */
class Patch extends React.Component {
  constructor(props) {
    super(props);

    this._id = _.uniqueId('p_');

    const mid = getMidPoint(props.vertices[1], props.vertices[2]);

    this.state = {
      a: props.vertices[0],
      b: props.vertices[1],
      c: props.vertices[2],
      mid,
      distance: Math.max(getDistance(props.vertices[0], props.vertices[1]), getDistance(props.vertices[0], props.vertices[2]))
    };

  }
  componentDidMount() {
    const r = this.state.distance;
    TweenLite.to(this.clipPath, 2, { attr: { r }, delay: this.props.delay, ease: Quad.easeOut });
  }
  /**
   * render - render the component
   * @return {ReactElement} markup
   */
  render() {
    const { a, b, c, mid, distance } = this.state;
    const { color, fill } = this.props;

    const origin = `M ${a[0]} ${a[1]}`;
    const lines = 24;

    const midPoints = _.times(lines - 2, i => {
      const perc = (i / (lines - 2));
      const p = getMidPoint(b, c, perc);
      return `${origin} L ${p[0]} ${p[1]}`;
    });

    const pathData = `${origin}
      L ${b[0]} ${b[1]}
      ${midPoints.join(' ')}
      ${origin}
      L ${c[0]} ${c[1]}
      L ${b[0]} ${b[1]}`;

    return (
      <g className='patch' transform='translate(0,0)'>
        <path stroke={color} fill='none' clipPath={`url(#${this._id})`} d={pathData} />
        <circle cx={a[0]} cy={a[1]} r={distance * 0.2} fill={color} opacity={0} />
        <clipPath id={this._id}>
          <circle ref={_clipPath => { this.clipPath = _clipPath; }} cx={a[0]} cy={a[1]} r={0} fill='black' />
        </clipPath>
      </g>
    );
  }
}

export default Patch;
