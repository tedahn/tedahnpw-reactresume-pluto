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
        <experience id="resume">
          <h1>My Experience</h1>

          <div className="work">
            <div className="work-image">
              <img src="images/experience/webtoon.jpg" alt="Webtoon Logo" />
            </div>
            <div className="work-content">
              <h2>LINE Webtoon</h2>
              <h3>08.2014 - 05.2019 | Los Angeles, CA</h3>
              <p>Worked as data analyst</p>
            </div>
          </div>

          <div className="work">
            <div className="work-image">
              <img src="images/experience/webtoon.jpg" alt="Webtoon Logo" />
            </div>
            <div className="work-content">
              <h2>LINE Webtoon</h2>
              <h3>08.2014 - 05.2019 | Los Angeles, CA</h3>
              <p>Worked as data analyst</p>
            </div>
          </div>

        </experience>
    )
  }
}


export default Home;
