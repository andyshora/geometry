// Imports
import React from 'react';
import _ from 'lodash';

import { voronoi } from 'd3';
import chroma from 'chroma-js';
import Patch from './patch';

let ANIM_DURATION = 5;

const COLORS = [
  'HOTPINK',
  'AQUAMARINE',
  'GOLD',
  'CORAL',
  'POWDERBLUE',
  'BLUEVIOLET',
  'PALEGREEN',
  'DARKORANGE',
  'MEDIUMSPRINGGREEN',
  'ORANGERED',
  'CYAN',
  'CRIMSON',
  'MEDIUMVIOLETRED'
];

/**
 * Get the distance between two points
 * @type {number}
 */
const getDistance = (a, b) => {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
};

const getColor = () => {
  const index = _.random(0, COLORS.length - 1);
  return COLORS[index];
};

/**
 * Description
 */
class Quilt extends React.Component {
  constructor(props) {
    super(props);

    const v = voronoi();

    const triangles = v(_.sortBy(props.points, d => d[0] * d[1])).triangles();
    this.colors = chroma.scale([getColor(), 'black']).colors(10);

    this.state = {
      points: props.points,
      triangles
    };
  }
  /**
   * render - render the component
   * @return {ReactElement} markup
   */
  render() {
    const { divisions, height, points, width } = this.props;
    const { triangles } = this.state;
    const dimensions = {
      width,
      height
    };
    const styles = {
      style: {
      }
    };
    const colors = this.colors;
    return (
      <svg className='quilt' {...dimensions} {...styles}>
        {triangles.map((t, i) => {
          const colorIndex = Math.max(getDistance(t[0], t[1]), getDistance(t[0], t[2])) < height * 0.1
            ? _.random(0, 5)
            : _.random(5, 8);
          return (
            <Patch
              delay={i * (ANIM_DURATION / triangles.length)}
              width={width}
              height={height}
              key={i}
              divisions={divisions}
              vertices={t}
              color={colors[colorIndex]} />
          );
        })}
      </svg>
    );
  }
}

export default Quilt;
