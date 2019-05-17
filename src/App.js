import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';

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
    
    return (
      <div className="App">
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
          <ul id="nav" className="nav">
              <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
              <li><a className="smoothscroll" href="#about">About</a></li>
            <li><a className="smoothscroll" href="#resume">Resume</a></li>
              <li><a className="smoothscroll" href="#portfolio">Works</a></li>
              <li><a className="smoothscroll" href="#contact">Contact</a></li>
          </ul>
        </nav>


        <Home data={this.state.resumeData.main} />
        <div className="card">
          <About data={this.state.resumeData.main} />
        </div>

        <div id="go-left">
          <a><FontAwesomeIcon icon='chevron-left'/></a>
        </div>

        <div id="go-right" onClick="getNext()">
          <a><FontAwesomeIcon icon='chevron-right'/></a>
        </div>

      </div>
    );
  }

  getNext(){
    alert('next');
  }
}

export default App;
