// Imports
import React from 'react';
import _ from 'lodash';

import { voronoi } from 'd3';
import chroma from 'chroma-js';
import Patch from './patch';

/**
 * Description
 */
class Quilt extends React.Component {
  constructor(props) {
    super(props);

    const data = _.range(1, props.points + 1)
      .map(d => [_.random(0, 1, true), _.random(0, 1, true)]);

    const v = voronoi();

    const triangles = v(data).triangles();
    this.colors = chroma.scale(['white', 'red']).colors(10);

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
    const { height, points, width } = this.props;
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
        {triangles.map((t, i) => <Patch width={width} height={height} key={i} vertices={t} color={colors[i % 10]} />)}
      </svg>
    );
  }
}

export default Quilt;
