
import {  useParams } from 'react-router-dom';  
   import './navRoutes.css'
    import React, {useEffect, useState} from 'react'
    import { BiWorld } from "react-icons/bi";
    import {FaBars} from 'react-icons/fa';
    import { IconContext } from 'react-icons/lib';
    import { GiChefToque } from "react-icons/gi";
    import { animateScroll as scroll } from 'react-scroll/modules';
    import { Nav, NavbarContent, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, FormButton } from './navRoutesElements'
    import { useAuth } from '../context/authContext';
    import otec from '../../otec.jpeg'
    
    const NavRoutes = ({toggle}) => {
      const [scrollNav, setScrollNav] = useState(false)
      const {id} = useParams();
      const {user, logout} = useAuth()
    
    
    
      const handleLogout = async() => {
        try{
          await logout()
        } catch (err){

        }
      }
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
                    <div className='styleBook'>


                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link active font-color link" aria-current="page" href={`/general/${id}`}>General   </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link font-color link" href={`/class/${id}`}>Clases   </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link font-color link" href={`/students/${id}`}>Alumnos   </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link font-color link" href={`/auth/${id}`}>Autorización   </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link font-color link" href={"/courses"}>Cursos   </a>
                            </li>

                        </ul>

                    </div>
                      
                    </NavMenu>
                    <NavBtn>
                    <FormButton onClick={handleLogout}>
                                Cerrar sesión
                    </FormButton>
                      </NavBtn>
                </NavbarContent>
            </Nav>
          </IconContext.Provider>
        </>
      )
    }
    
    
    
    
    export default  NavRoutes





   



//<div className='styleBook'>


//<ul className="nav justify-content-center">
  //  <li className="nav-item">
    //    <a className="nav-link active font-color" aria-current="page" href={`/general/${id}`}>General  / </a>
   // </li>

  //  <li className="nav-item">
   //     <a className="nav-link font-color" href={`/class/${id}`}>Clases  / </a>
   // </li>

   // <li className="nav-item">
  //      <a className="nav-link font-color" href={`/students/${id}`}>Alumnos  / </a>
   // </li>
   // <li className="nav-item">
    //    <a className="nav-link font-color" href={"/courses"}>Cursos  / </a>
   // </li>

//</ul>

//</div>