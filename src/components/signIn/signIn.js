import React, {useState} from 'react'
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon } from './signInElements'
import { useAuth } from '../context/authContext';
import {  useNavigate } from 'react-router-dom';
import otec from '../../otec.jpeg'
const SignIn = () => {

  
  const navigate = useNavigate();
  const {login} = useAuth();
  const [error, setError] = useState();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = ({target: {name, value }}) => {
    setUser({...user,[name]:value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/courses')
    } catch (error){
      setError(error.message);
    }
    
  }



  return (
    <>
    <Container>
        <FormWrap>
            <Icon to="/"> 
            <img src={otec} style={{"height": "130px", "width": "130px"}}></img>
            </Icon>
            <FormContent>
              
                <Form action='#' onSubmit={handleSubmit}>
                  
                    <FormH1>Signin in your account</FormH1>
                    <FormLabel htmlFor='for' >Email</FormLabel>
                    <FormInput type="email" name="email" onChange={handleChange} required/>
                    <FormLabel htmlFor='for'>Password</FormLabel>
                    <FormInput type="password" name="password" onChange={handleChange} required/>
                    <FormButton type='submit' >Continue</FormButton>
                    <br></br>

                    {error && <p>{error}</p>}
                </Form>
            </FormContent>
        </FormWrap>
    </Container>
      
    </>
  )
}

export default SignIn
