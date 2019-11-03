import React, { Component } from 'react';

//Google Analytics
import ReactGA from 'react-ga';
import $ from 'jquery';

//Page components
import './App.css';
import Social from './Components/Desktop/Social';
import About from './Components/Desktop/About';
import Experience from './Components/Desktop/Experience';
import Work from './Components/Desktop/Work';
import Contact from './Components/Desktop/Contact';

//Page Effects
import {SectionsContainer, Section, ScrollToTopOnMount, Header} from 'react-fullpage';
import { useMediaQuery } from 'react-responsive'
import { Waypoint } from 'react-waypoint';
import Fade from 'react-reveal/Fade';

//Font Awesome and Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    let options = {
      anchors:              ['about', 'experience', 'work', 'contact'],
      scrollBar:            true,
      navigation:           false,
      activeClass:          "",
      verticalAlign:        true,
      delay:                1000,

    };

    return (
      <div className="App">
        
        <div id="nav-wrap">
          <ul id="nav" className="nav-wrap">
            <Fade bottom delay={100}>
            <li><a className="smoothscroll" href="#about"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;About</a></li>
            </Fade>
            <Fade bottom delay={300}>
            <li><a className="smoothscroll" href="#experience"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Experience</a></li>
            </Fade>
            <Fade bottom delay={500}>
            <li><a className="smoothscroll" href="#work"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Works</a></li>
            </Fade>
            <Fade bottom delay={700}>
            <li><a className="smoothscroll" href="#contact"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Contact</a></li>
            </Fade>
          </ul>
        </div>
        
        <ScrollToTopOnMount />
        <SectionsContainer {...options}>
          <Section>
            <Waypoint onEnter={()=>{this.handleEnter(0)}}/>
            <About data={this.state.resumeData.main}/>
          </Section>
          <Section>
            <Waypoint onEnter={()=>{this.handleEnter(1)}}/>
            <Experience data={this.state.resumeData.resume} />
          </Section>
          <Section>
            <Waypoint onEnter={()=>{this.handleEnter(2)}}/>
            <Work data={this.state.resumeData.portfolio}/>
          </Section>
          <Section>
            <Waypoint onEnter={()=>{this.handleEnter(3)}}/>
            <Contact data={this.state.resumeData.main}/>
          </Section>
        </SectionsContainer>

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
