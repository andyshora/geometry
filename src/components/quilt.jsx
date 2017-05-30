// Imports
import React from 'react';
import _ from 'lodash';

import { voronoi } from 'd3';
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
    console.log(data, triangles);

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
        background: 'hotpink'
      }
    };
    return (
      <svg className='quilt' {...dimensions} {...styles}>
        {triangles.map((t, i) => <Patch width={width} height={height} key={i} vertices={t} />)}
      </svg>
    );
  }
}

export default Quilt;
