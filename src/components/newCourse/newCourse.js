

import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { collection, query, getDocs, doc,  setDoc, addDoc} from 'firebase/firestore'
import {Link} from 'react-router-dom';
import { Nav, NavbarContent, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, FormButton } from './newCourseElements'
import otec from '../../otec.jpeg'
import { useAuth } from '../context/authContext';
import { IconContext } from 'react-icons/lib';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll/modules';
import './newCourse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTruck,  faTruckRampBox,   faTruckField, faTruckFront } from '@fortawesome/free-solid-svg-icons'



const NewCourse = ({toggle}) => {

  const [scrollNav, setScrollNav] = useState(false)
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



  const [name, setName] = useState('');
  const [course, setCourse] = useState([]);


// Add a new document in collection "cities"

    let getGeneralCollection = query(collection(db, `cursos`))
    //const insertGeneralCollection = query(collection(db, `cursos/${name}`))

    const addCourse = async (e) =>{
        e.preventDefault()

        await setDoc(doc(db, "cursos", `${name}`), {});
        getCourse();
    }

    const getCourse = async () =>{

        //const ref = doc(db, 'cursos/xxxx/clase')
        const get = await getDocs(getGeneralCollection)

    
        setCourse( 
            //getBook.data()
            get.docs.map((docs) => ({...docs.data(), id: docs.id}))
        )


        
        
    }

    useEffect(() =>{
        getCourse()
    },[])

    return(
        
      <div>

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
                    <FormButton onClick={handleLogout}>
                                Cerrar sesión
                    </FormButton>
                      </NavBtn>
                </NavbarContent>
            </Nav>
          </IconContext.Provider>


            <div className="card text-center body-card">
                <div className="card-header" style={{"backgroundColor": "#2c3e50", "color": "white"}}>
                    Nuevo Cursos
                </div>
                <div className="card-body">

                    
                  <input type='text' placeholder='código del curso'  className='form-control' onChange={(e) => setName(e.target.value)}></input>
                    
                  <button onClick={addCourse}  className="btn input">Crear curso</button>
                    
         
                </div>
                
            </div>



            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button  header-table" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Cursos
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="list-group">
                          {course.map((data) => (
                              <div  key={data.id}>
                                  <Link className="list-group-item list-group-item-action" to={`/general/${data.id}`}>{data.id}</Link>
                              </div>
                          ))}
                    </div>
                  </div>
                </div>
             </div>
            </div>

      </div>
    )
}

export default NewCourse