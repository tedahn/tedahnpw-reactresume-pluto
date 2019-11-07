import React from 'react';

import { useMediaQuery } from 'react-responsive'
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 950 })
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 950 })
  return isMobile ? children : null
}
 
const Navgiation = () => (
  <div>
    <Desktop>
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
    </Desktop>
    <Mobile>
      <ul id="nav" className="nav-wrap mobile">
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
    </Mobile>
  </div>
)
 
export default Navgiation