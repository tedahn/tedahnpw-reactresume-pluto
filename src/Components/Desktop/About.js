import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Fade from 'react-reveal/Fade';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var profileborder= "images/"+this.props.data.imageborder;
      var occupation= this.props.data.occupation;
      var description= this.props.data.description;
      var basecity= this.props.data.basecity;
      var basestate= this.props.data.basestate;
      var networks= this.props.data.social.map(function(network){
        var iconName = [network.iconType , network.className];
        return <li key={network.name}><a href={network.url} target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={iconName}/></a></li>
      })
    }

    return (
        <about>

          <Fade bottom distance="3.0em" delay={1000}>
          <div className="row banner">
            <div className="banner-text">
              <h3><span>Hi, my name is</span></h3>
              <h1>{name}.</h1>
              <h3>I'm a {basecity} based <span>{occupation}</span>.</h3>
              
              <h3><span>I believe...</span></h3>
              <h3>
                  <span><FontAwesomeIcon icon="hashtag"/></span> &nbsp;
                  Being "customer-oriented" means work ethics are passion driven and personality is people driven.
              </h3>
              <h3>
                  <span><FontAwesomeIcon icon="hashtag"/></span> &nbsp;
                  Well-documented code explains "why".
              </h3>
              <h3>
                  <span><FontAwesomeIcon icon="hashtag"/></span> &nbsp;
                  Good code is code you don't have to write.
              </h3>
            </div>
            <div className="banner-image">
                <img className="profile-pic"  src={profilepic} alt="Profile Pic" />
            </div>
          </div>
          </Fade>
        </about>
    );
  }
}

export default About;
