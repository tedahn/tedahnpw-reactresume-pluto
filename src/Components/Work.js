import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Work extends Component {


  handleCardClick(num){
      console.log("clicked " + num);
  }

  render() {


    if(this.props.data){
      let e = this.handleCardClick.bind(this);
      var projectList = this.props.data.projects.map(function(portfolio){
        var icons = portfolio.tools.map(function(tool){
          let name = ["fab", tool];
          return <FontAwesomeIcon icon={name}/>
        })

        return (
        <card onClick={() => e(portfolio.url)}>
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
        )})
    }

    return (
        <work>
          <h1>My Projects and Works</h1>
          <div className="container">
            {projectList}
          </div>
        </work>
    )
  }
}


export default Work;
