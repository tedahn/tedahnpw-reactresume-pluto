import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Experience from './Components/Experience';
import {SectionsContainer, Section, Header, Footer} from 'react-fullpage';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faCoffee, faPaperPlane, faChevronRight, faChevronLeft, faHashtag)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
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

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    let options = {
      sectionClassName:     'section',
      anchors:              ['about', 'resume', 'portfolio', 'contact'],
      scrollBar:            true,
      navigation:           false,
      verticalAlign:        true,
      sectionPaddingTop:    '50px',
      sectionPaddingBottom: '50px',
      arrowNavigation:      true,
      scrollHorizontally: true
    };

    return (
      <div className="App">
        <Header>
          <ul id="nav" className="nav">
              <li className="current"><a className="smoothscroll" href="#about"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;About</a></li>
              <li><a className="smoothscroll" href="#resume"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Experience</a></li>
              <li><a className="smoothscroll" href="#portfolio"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Works</a></li>
              <li><a className="smoothscroll" href="#contact"><span><FontAwesomeIcon icon="hashtag"/></span>&nbsp;Contact</a></li>
          </ul>
        </Header>
        
        <SectionsContainer {...options}>
          <Section>
            <About data={this.state.resumeData.main} />
          </Section>
          <Section>
            <Experience data={this.state.resumeData.main} />
          </Section>
          <Section id="portfolio">
            Page 3
          </Section>
          <Section id="contact">
            Page 4
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
