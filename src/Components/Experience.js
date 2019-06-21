import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {
  render() {

    if(this.props.data){
      var workList = this.props.data.work.map(function(work){
        return (
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
        )})
    }

    return (
        <experience>
          <h1>My Experience</h1>
          <div className="container">
            {workList}
          </div>

        </experience>
    )
  }
}


export default Home;
