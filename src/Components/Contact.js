import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';

class Contact extends Component {
  render() {

    if(this.props.data){
        var email = this.props.data.email
        var link = "mailto:"+this.props.data.email;
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
                  <span className="main">Job Availability: Available</span><br/>
                  <span className="secondary">Collaboration Availability: Always</span><br/>
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
