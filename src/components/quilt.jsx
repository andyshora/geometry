// Imports
import React from 'react';
import _ from 'lodash';

import { voronoi } from 'd3';
import chroma from 'chroma-js';
import Patch from './patch';

let ANIM_DURATION = 5;

/**
 * Description
 */
class Quilt extends React.Component {
  constructor(props) {
    super(props);

    const data = _.range(0, 1, 1 / props.points)
      .map((d, i) => {
        return [_.random(0, 1, true) * props.width, _.random(0, 1, true) * props.height];
      });

    const v = voronoi();

    const triangles = v(_.sortBy(data, d => d[0] * d[1])).triangles();
    this.colors = chroma.scale(['hotpink', 'black']).colors(10);

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
        {triangles.map((t, i) => <Patch delay={i * (ANIM_DURATION / triangles.length)} width={width} height={height} key={i} divisions={divisions} vertices={t} color={colors[i % 10]} />)}
      </svg>
    );
  }
}

export default Quilt;
