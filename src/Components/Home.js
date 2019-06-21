import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {
  render() {

    if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        var iconName = [network.iconType , network.className];
        return <li key={network.name}><a href={network.url} target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={iconName}/></a></li>
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
