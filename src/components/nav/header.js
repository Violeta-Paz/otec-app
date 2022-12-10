
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTruck,  faTruckRampBox,   faTruckField, faTruckFront } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll/modules';
import { Nav, NavbarContent, NavLogo, MobileIcon, NavMenu, NavBtn, NavBtnLink,  } from './headerElements'
import otec from '../../otec.jpeg'

const Header = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if(window.scrollY >= 80){
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  }
  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <Nav scrollNav={scrollNav}>
            <NavbarContent>
                <NavLogo to='/' onClick={toggleHome}>
              
                <img src={otec} style={{"height": "145px", "width": "145px"}}></img>
              
                </NavLogo>
                <MobileIcon onClick={toggle}>
                  <FaBars />
                </MobileIcon>
                <NavMenu>

                  <ul className="nav justify-content-center" style={{"marginTop":"4px"}}>
                    <li className="nav-item truck" style={{"color": "white", "margin":"5px",  "fontSize": "20px"}}>
                        
                        <FontAwesomeIcon icon={faTruck} />
                    </li>

                    <li className="nav-item truck" style={{"color": "white", "margin":"5px", "fontSize": "20px"}}>
                    <FontAwesomeIcon icon={faTruckRampBox}/>
                    </li>

                    <li className="nav-item truck" style={{"color": "white", "margin":"5px", "fontSize": "20px"}}>
                    <FontAwesomeIcon icon={ faTruckField}/>
                    </li>

                    <li className="nav-item truck" style={{"color": "white", "margin":"5px", "fontSize": "20px"}}>
                    <FontAwesomeIcon icon={faTruckFront }/>
                    </li>

                  </ul>

                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                  </NavBtn>
            </NavbarContent>
        </Nav>
      </IconContext.Provider>
    </>
  )
}




export default Header