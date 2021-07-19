import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MediaQuery from 'react-responsive'
import Fade from 'react-reveal/Fade';

class Work extends Component {
  render() {
    function desktopCards(portfolio, icons){
      return (
              <card>
                <a href={portfolio.url}>
                  <div>
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
                  </div>
                </a>
              </card>
      )
    }

    function mobileCards(portfolio, icons){
      return (
          <div>
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
          </div>
      )
    }

    if(this.props.data){
      var delayUp = 400;
      var projectList = this.props.data.projects.map(portfolio => {
        const icons = portfolio.tools.map(tool => {
          let name = ["fab", tool];
          return <FontAwesomeIcon icon={name}/>
        })
        delayUp += 300;
        return (
          <div>
            <MediaQuery minWidth={250}>
              {desktopCards(portfolio, icons)}
            </MediaQuery>
            <MediaQuery maxWidth={250}>
              {mobileCards(portfolio, icons)}
            </MediaQuery>
          </div>
        )
      })
    }

    return (
        <work>
          <Fade bottom delay={300}>
          <h1>My Projects and Works</h1>
          </Fade>
          <Fade right delay={delayUp}>
            <div className="container">
              {projectList}
            </div>
          </Fade>
        </work>
    )
  }
}


export default Work;
