import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Experience from './Components/Experience';
import Work from './Components/Work';
import Contact from './Components/Contact';
import {SectionsContainer, Section, Footer} from 'react-fullpage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Waypoint } from 'react-waypoint';

import Fade from 'react-reveal/Fade';

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
      sectionClassName:     'section',
      anchors:              ['about', 'resume', 'portfolio', 'contact'],
      scrollBar:            true,
      verticalAlign:        true,
    };

    return (
      <div className="App">
        
        <div id="nav-wrap">
          <ul id="nav" className="nav-wrap">
            <Fade bottom delay={100}>
            <li className="current"><a className="smoothscroll" href="#about"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;About</a></li>
            </Fade>
            <Fade bottom delay={300}>
            <li><a className="smoothscroll" href="#resume"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Experience</a></li>
            </Fade>
            <Fade bottom delay={500}>
            <li><a className="smoothscroll" href="#portfolio"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Works</a></li>
            </Fade>
            <Fade bottom delay={700}>
            <li><a className="smoothscroll" href="#contact"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Contact</a></li>
            </Fade>
          </ul>
          </div>
        
        <SectionsContainer {...options}>
          <Section className="sectionContainer" id="about">
            <Waypoint onEnter={() => {this.handleEnter(0)}}/>
            <About data={this.state.resumeData.main}/>
          </Section>
          <Section className="sectionContainer" id="resume">
            <Waypoint onEnter={() => {this.handleEnter(1)}}/>
            <Experience data={this.state.resumeData.resume} />
          </Section>
          <Section  className="sectionContainer" id="portfolio">
            <Waypoint onEnter={() => {this.handleEnter(2)}}/>
            <Work data={this.state.resumeData.portfolio}/>
          </Section>
          <Section  className="sectionContainer" id="contact">
            <Waypoint onEnter={() => {this.handleEnter(3)}}/>
            <Contact data={this.state.resumeData.main}/>
          </Section>
        </SectionsContainer>
        <Home data={this.state.resumeData.main} />

        
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
