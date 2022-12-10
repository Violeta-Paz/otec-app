
import  React, {useEffect, useState} from 'react';
import './tableGeneral.css';
import { addDoc, collection, query, getDocs, doc, deleteDoc, updateDoc, getDoc, setDoc, QuerySnapshot} from 'firebase/firestore'
import db from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faTrash,  faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'


// CommonJS


const TableGeneral = () => {

    const navigate = useNavigate()

    const {id} = useParams();

    const initialStateValues = {
        nombre: "" ,
        rut: "", 
        contacto: "",
        email: "", 
        lisencia: "",
        fecha: "", 
        ficha: "", 
        estadoIns: "",
        //estadoPago: "", 
        obs: ""
    }

    const initialStateValuesUpdate = {
        nombre: "" ,
        rut: "", 
        contacto: "",
        email: "", 
        licencia: "",
        fecha: "", 
        ficha: "", 
        estadoIns: "",
        //estadoPago: "", 
        obs: ""
    }

    const [values, setValues] = useState(initialStateValues)
    const [valuesUpdate, setValuesUpdate] = useState(initialStateValuesUpdate)
    const [idUpdate, setIdUpdate] = useState("")

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const handleInputChangeUpdate = (e) =>{
        const {name, value} = e.target;
        setValuesUpdate({...valuesUpdate, [name]: value})
    }


    //config hooks

    const [generalData, setGeneralData] = useState([]);
    const [generalName, setGeneralName] = useState('');
    const [generalRut, setGeneralRut] = useState(0);
    const [generalContact, setGeneralContact] = useState('');
    const [generalEmail, setGeneralEmail] = useState('');
    const [generalLisence, setGeneralLisence] = useState('');
    const [generalDate, setGeneralDate] = useState('');
    const [generalFile, setGeneralFile] = useState('');
    const [generalState, setGeneralState] = useState('');
    //const [generalStatePay, setGeneralStatePay] = useState('');
    const [generalObs, setGeneralObs] = useState('');



    // ref bd

    const generalCollection = query(collection(db, `cursos/${id}/general`))
    
    // get general

    const getGeneral = async () =>{
        const data = await getDocs(generalCollection)
        
        setGeneralData(
            data.docs.map((docs) => ({...docs.data(), id: docs.id}))
        )
        console.log(generalData)
    }

    // detele general

    const deleteGeneral = async (idDelete) => {
        const generalDoc = doc(db, `cursos/${id}/general`, idDelete)
        await deleteDoc(generalDoc)
        getGeneral()
    }

    // create

    const insert = async (e) =>{
        e.preventDefault()
        await addDoc(generalCollection, {nombre: generalName , rut: generalRut, contacto: generalContact, email: generalEmail, licencia: generalLisence, fecha: generalDate, ficha: generalFile, estadoIns: generalState, obs: generalObs  })
        //await addDoc(generalCollection, values)
        getGeneral()
        setValues({...initialStateValues})
    }

    // update

    const getGeneralById = async(idGet) => {
        
        setIdUpdate(idGet)
        const docRef = doc(db, `cursos/${id}/general`, `${idGet}`);
        const docSnap = await getDoc(docRef);

        console.log(docSnap.data())
        setValuesUpdate(docSnap.data())
    }

    const updateGeneral = async (e) =>{
        e.preventDefault()
        const docRef = doc(db, "cursos/xxxx/general", `${idUpdate}`);
        await updateDoc(docRef, valuesUpdate)
        console.log('update')
        setIdUpdate("")
        setValuesUpdate({...initialStateValuesUpdate})
        getGeneral()

         
    }




    //useEffect

    useEffect(() =>{
        getGeneral()
        
    },[])
    
        return (

            <div >
                

            
        
         
                
                <table className='table table-hover table-get' >

                    <thead>

                        <tr className='header-table'>
                        <th  ></th>
                            <th  >Nombre</th>
                            <th  >Rut</th>
                            <th  >Contacto</th>
                            <th  >Email</th>
                            <th  >Licencia</th>
                            <th  >Fecha</th>
                            <th  >Ficha</th>
                            <th  >Estado inscripción</th>
                            <th  >Observaciones</th>
                            <th  ></th>
                            <th  ></th>
                        </tr>

                    </thead>

                    <tbody>

                        {generalData.map((data) => (
                            <tr className='body' key={data.id}>
                                <td ></td>
                                <td >{data.nombre}</td>
                                <td >{data.rut}</td>
                                <td >{data.contacto}</td>
                                <td >{data.email}</td>
                                <td >{data.licencia}</td>
                                <td >{data.fecha}</td>
                                <td >{data.ficha}</td>
                                <td >{data.estadoIns}</td>
                                <td >{data.obs}</td>
                                <td ><button onClick={() => {deleteGeneral(data.id)}} type="button" className="btn btn-light  btn-delete"><FontAwesomeIcon icon={faTrash} /></button></td>
                                <td ><button  onClick={() => {getGeneralById(data.id)}} type="button" className="btn btn-ligth  btn-update" data-bs-toggle="modal" data-bs-target="#exampleModal"><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                            </tr>
                        ))}

                    </tbody>

                        
        
                </table>

              
                
                <div className='centerButton'>
                    <button onClick={insert} type="button" className="btn   btn-circle"><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <table className='table table-hover table-add'>

                    <thead>

                        <tr className='header-table '>
                            <th ></th>
                            <th  >Nombre</th>
                            <th  >Rut</th>
                            <th  >Contacto</th>
                            <th  >Email</th>
                            <th  >Licencia</th>
                            <th  >Fecha</th>
                            <th  >Ficha</th>
                            <th  >Estado inscripción</th>
                            <th  >Observaciones</th>
                            <th ></th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr>
                        <td></td>
                        <td><input value={generalName} onChange={ (e) => setGeneralName(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalRut} onChange={ (e) => setGeneralRut(e.target.value)} type="number" className='form-control'></input></td>
                        <td><input value={generalContact} onChange={ (e) => setGeneralContact(e.target.value)} type="number" className='form-control'></input></td>
                        <td><input value={generalEmail} onChange={ (e) => setGeneralEmail(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalLisence} onChange={ (e) => setGeneralLisence(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalDate} onChange={ (e) => setGeneralDate(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalFile} onChange={ (e) => setGeneralFile(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalState} onChange={ (e) => setGeneralState(e.target.value)} type="text" className='form-control'></input></td>
                        <td><input value={generalObs} onChange={ (e) => setGeneralObs(e.target.value)} type="text" className='form-control'></input></td>
                        <td></td>
                        </tr>


                       {/* <tr>
                        <td><input defaultValue={values.nombre} name='nombre' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.rut} name='rut' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.contacto} name='contacto' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.email} name='email' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.lisencia} name='lisencia' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.fecha} name='fecha' onChange={handleInputChange}></input></td>
                        <td><input defaultvalue={values.ficha} name='ficha' nChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.estadoIns} name='estadoIns' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.estadoPago} name='estadoPago' onChange={handleInputChange}></input></td>
                        <td><input defaultValue={values.obs} name='obs' onChange={handleInputChange}></input></td>
                        </tr>*/}
                        </tbody>
                    </table>
                    

                    
                    
               
                



          


                <div className="modal fade  modal-xl modal-dialog-scrollable " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content  colorModal">
                        <div className="modal-header  colorModal">
                            <h5 className="modal-title" id="exampleModalLabel" style={{'color': '#2c3e50'}}>Modificar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body colorModal">
                            
                                
                                <table className='table table-hover table-get-modal' >
                                    
                                    <thead>

                                        <tr className='header-table'>
                                                    <th  id='name' className="headerName">Nombre</th>
                                                    <th  id='rut'>Rut</th>
                                                    <th  id='contact'>Contacto</th>
                                                    <th  id='email'>Email</th>
                                                    <th  id='lisence'>Licencia</th>
                                                    <th  id='date'>Fecha</th>
                                                    <th  id='file'>Ficha</th>
                                                    <th  id='state'>Estado inscripción</th>
                                                    <th  id='info'>Observaciones</th>
                                        </tr>

                                    </thead>

                                    <tbody>   
                                        <tr className='body-table' style={{"backgroundColor":"white"}}>

                                        <td><input value={valuesUpdate.nombre} name='nombre' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.rut} name='rut' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.contacto} name='contacto' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.email} name='email' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.licencia} name='licencia' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.fecha} name='fecha' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.ficha} name='ficha' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.estadoIns} name='estadoIns' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                        <td><input value={valuesUpdate.obs} name='obs' className='form-control' onChange={handleInputChangeUpdate}></input></td>
                                                
                                        </tr>
                                        
                                        
                                        
                                        
                                    </tbody> 
                                    
                                      
                                </table>
                                
                            
                        </div>
                        <div className="modal-footer colorModal">
                            <button type="button" className="btn btn-color-close" data-bs-dismiss="modal">Close</button>
                            <button onClick={updateGeneral} type="button" className="btn btn-color">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>            
               
            </div>

          );

}

export default TableGeneral