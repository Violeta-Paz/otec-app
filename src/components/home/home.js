import React, {useState} from 'react'
import Video from '../../video/video.mp4'
import {HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight} from './homeElements'
import { Button } from '../buttonElements'
import Header from '../nav/header'
const Home = () => {
  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }
  return (
 
    <HeroContainer >
      <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type='video/' mp4 />
      </HeroBg>
      <HeroContent>
        <HeroH1> </HeroH1>
        <HeroP>

        </HeroP>
        
        <HeroBtnWrapper>

        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default Home