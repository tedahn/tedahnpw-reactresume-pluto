import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';

class Contact extends Component {
  render() {

    if(this.props.data){
        var email = this.props.data.email
        var link = "mailto:"+this.props.data.email;
        var jobAvailable = this.props.data.availability.job;
        var collabAvailable = this.props.data.availability.collab;
    }

    function JobAvailability(props) {
      if (jobAvailable){
        return <span className="main green">Job Availability: Available</span>
      } else {
        return <span className="main red">Job Availability: Unavailable</span>
      }
    }

    function CollabAvailability(props) {
      if (collabAvailable){
        return <span className="secondary green">Collaboration Availability: Always</span>
      } else {
        return <span className="secondary green">Collaboration Availability: Always</span>
      }
    }

    return (
        <contact id="contact">
          <div>
            <Fade cascade bottom distance="1000px"delay={300}>
              <div className="row banner">
                <h1>Say Hello!</h1>
                <p>I'm passionate about meeting new people and collaborating to reach bigger ambitions.</p>
                <p>Feel free to reach out to me for any and all inquiries!</p>
                
                <br></br>
                  <div>
                    <JobAvailability/> <br/>
                    <CollabAvailability/> <br/>
                  </div>
                <br></br>

                <div>
                <a href={link}>{email}</a>
                </div>
              </div>
            </Fade>
          </div>
        </contact>
    );
  }
}

export default Contact;
