import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Fade from 'react-reveal/Fade';

class Home extends Component {
  render() {

    if(this.props.data){
      var delayUp = 1200;
      var networks= this.props.data.social.map(function(network){
        var iconName = [network.iconType , network.className];
        delayUp += 150;
        return (
        <Fade bottom delay={delayUp}>
          <li key={network.name}><a href={network.url} target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={iconName}/></a></li>
        </Fade>
        )
      })
    }

    return (
      <div>
        <ul className="social">
          {networks}
        </ul>
      </div>
    )
  }
}


export default Home;
