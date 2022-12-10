
import  React, {useEffect, useState} from 'react';
import {  collection, query, getDocs, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import db from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faTrash, faFile } from '@fortawesome/free-solid-svg-icons'
import { addFile } from '../../firebase';
import {  useParams } from 'react-router-dom';
import './tableStudents.css';

const TableStudents = () => {

    const {id} = useParams();

    const [generalData, setGeneralData] = useState([]);
    const [file, setFile] = useState(null)
    const [urlDoc, setUrlDoc] = useState('')

    const generalCollection = query(collection(db, `cursos/${id}/general`))

    const getGeneral = async () =>{
        const data = await getDocs(generalCollection)
        
        setGeneralData(
            data.docs.map((docs) => ({...docs.data(), id: docs.id}))
        )

    }

    const deleteGeneral = async (idDelete) => {
        const generalDoc = doc(db, `cursos/${id}/general`, idDelete)
        await deleteDoc(generalDoc)
        getGeneral()
    }

    const submitFile = async ( id) => {
        try{
            const url = await addFile(file, 'ficha Alumno');

            setUrlDoc(url)
            insert(id)
        } catch(err) {

        }

    }

    const insert = async (idInsert) =>{
        //e.preventDefault()
        //await addDoc(doc(db, "cursos/xxxx/general", `${id}`), {libro: urlDoc})
        const docRef = doc(db, `cursos/${id}/general`, `${idInsert}`);
        await updateDoc(docRef, {libro: urlDoc})
        //await addDoc(generalCollection, values))
    }

    useEffect(() =>{
        getGeneral()
    },[])


    return(
        <div>

            <table className='table table-hover table-get' >

                <thead>

                    <tr className='header-table'>
                    <th  ></th>
                        <th  >Nombre</th>
                        <th  >Rut</th>
                        <th  >Contacto</th>
                        <th  >Email</th>
                        <th  ></th>
                        <th  ></th>
                        <th  ></th>
                        <th  ></th>
                    </tr>

                </thead>

                <tbody>

                    {generalData.map((data) => (
                        <tr className='body' key={data.id}>
                            <td ></td>
                            <td >{data.rut}</td>
                            <td >{data.nombre}</td>
                            <td >{data.contacto}</td>
                            <td >{data.email}</td>
                            <td>
                            <input type='file' className='form-control file' onChange={(e) => setFile(e.target.files[0])}></input>
                            </td>

                            <td ><a href={data.libro} className='btn btn-light icon ' type="button" ><FontAwesomeIcon icon={faFile} /></a></td>
                            <td>
                            <button onClick={() => {submitFile(data.id)}}  type="button" className="btn btn-light line" >+</button>
                            </td>
                            <td ><button onClick={() => {deleteGeneral(data.id)}} type="button" className="btn btn-light  btn-delete "><FontAwesomeIcon icon={faTrash} /></button></td>
       
                        </tr>
                    ))}

                </tbody>

                    

            </table>
        </div>
    )
}

export default TableStudents


