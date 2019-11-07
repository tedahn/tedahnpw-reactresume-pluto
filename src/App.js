import React, { Component } from 'react';

//Google Analytics
import ReactGA from 'react-ga';
import $ from 'jquery';

//Page components
import './App.css';
import Social from './Components/Social';
import About from './Components/About';
import Experience from './Components/Experience';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Navigation from './Components/Navigation';

//Page Effects
import { Waypoint } from 'react-waypoint';

//Font Awesome and Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {}
    };

    ReactGA.initialize('UA-134621161-1');
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: '/resumeData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  handleEnter(index){
    console.log(index);
    var navItems = $("#nav li");
    var i=0;
    for (let li of navItems) {
      let product = $(li);
      if (i===index){
        product.addClass('current');
      } else 
        product.removeClass('current');
      i++;
    }
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {

    return (
      <div className="App">
        <div id="nav-wrap">
          <Navigation/>
        </div>
        
          <div className="section home" id="about">
            <Waypoint onEnter={()=>{this.handleEnter(0)}}/>
            <About data={this.state.resumeData.main}/>
          </div>
          <div className="section" id="experience">
            <Waypoint onEnter={()=>{this.handleEnter(1)}}/>
            <Experience data={this.state.resumeData.resume} />
          </div>
          <div className="section" id="work">
            <Waypoint onEnter={()=>{this.handleEnter(2)}}/>
            <Work data={this.state.resumeData.portfolio}/>
          </div>
          <div className="section" id="contact">
            <Waypoint onEnter={()=>{this.handleEnter(3)}}/>
            <Contact data={this.state.resumeData.main}/>
          </div>

        <Social data={this.state.resumeData.main} />

        
        {/* 
        <div id="go-left">
          <a><FontAwesomeIcon icon='chevron-left'/></a>
        </div>

        <div id="go-right" onClick="getNext()">
          <a><FontAwesomeIcon icon='chevron-right'/></a>
        </div> */}

      </div>
    );
  }

}

export default App;
