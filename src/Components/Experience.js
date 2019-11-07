import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Fade from 'react-reveal/Fade';

class Experience extends Component {
  render() {

    if(this.props.data){
      var workList = this.props.data.work.map(function(work){
        return (
        <Fade bottom delay={300}>
          <div className="work">
            <div className="work-image">
              <img src={work.image} alt="Company Logo" />
            </div>
            <div className="work-content">
              <h1>{work.company}</h1>
              <h2>{work.title}</h2>
              <span>{work.dates} | {work.location}</span>
              <p>{work.description}</p>
            </div>
          </div>
        </Fade>
        )})
    }

    return (
        <experience>
          <Fade bottom delay={300}>
          <h1>My Experience</h1>
          </Fade>
          <div className="container">
            {workList}
          </div>

        </experience>
    )
  }
}


export default Experience;
