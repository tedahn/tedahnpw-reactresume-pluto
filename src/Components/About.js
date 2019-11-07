import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MediaQuery from 'react-responsive'

import Fade from 'react-reveal/Fade';

class About extends Component {
  render() {
    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var occupation= this.props.data.occupation;
      var basecity= this.props.data.basecity;
    }

    function introduction(){
      return (
        <div>
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
      );
    }

    function profileImage(){
      return(<img className="profile-pic"  src={profilepic} alt="Profile Pic" />);
    }
    return (
      <about>
        <Fade bottom distance="3.0em" delay={1000}>
          <MediaQuery minWidth={950}>
          <div className="row banner">
            <div className="banner-text">
              {introduction()}
            </div>
            <div className="banner-image">
              {profileImage()}
            </div>
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={950}>
          <div className="row banner mobile">
            <div className="banner-image mobile">
              {profileImage()}
            </div>
            <div className="banner-text mobile">
              {introduction()}
            </div>
          </div>
          </MediaQuery>
        </Fade>
      </about>
    );
  }
}

export default About;
