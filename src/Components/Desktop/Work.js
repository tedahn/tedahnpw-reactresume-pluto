import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Fade from 'react-reveal/Fade';

class Work extends Component {

  render() {
    if(this.props.data){
      var delayUp = 400;
      var projectList = this.props.data.projects.map(function(portfolio){
        var icons = portfolio.tools.map(function(tool){
          let name = ["fab", tool];
          return <FontAwesomeIcon icon={name}/>
        })
        delayUp += 300;
        return (
        <Fade right delay={delayUp}>
          <a href={portfolio.url}>
            <card>
              <div className="card-image">
                <img src={portfolio.image} alt="Project Picture" />
              </div>
              <div className="card-content">
                <h1>{portfolio.title}</h1>
                <span>{portfolio.dates}</span>
                <p>{portfolio.description}</p>
                
                <div className="tools">
                    {icons}
                </div>
              </div>
            </card>
          </a>
        </Fade>
        )
      })
    }

    return (
        <work>
          <Fade bottom delay={300}>
          <h1>My Projects and Works</h1>
          </Fade>
          <div className="container">
            {projectList}
          </div>
        </work>
    )
  }
}


export default Work;
