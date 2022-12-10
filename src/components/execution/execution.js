import React, { useState, useEffect } from 'react';
import './execution.css';
import { addFile } from '../../firebase';
import { addDoc, collection, query, getDocs} from 'firebase/firestore'
import db from '../../firebase';
import {  useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faFile} from '@fortawesome/free-solid-svg-icons'
const Execution = () => {

    
    const {id} = useParams();


        const [file, setFile] = useState(null)
        const [nameFile, setNameFile] = useState('')
        const [urlDoc, setUrlDoc] = useState('')
        const [book, setBook] = useState([])
        const generalCollection = query(collection(db, `cursos/${id}/auth`))

        const submitFile = async (e) => {
            try{
                e.preventDefault();
                const url = await addFile(file, `Ejecución de Actividades curso ${id}`);
                setUrlDoc(url)
                insert(url)
            } catch(err) {

            }

        }

        const insert = async (urlname) =>{
            //e.preventDefault()
            await addDoc(generalCollection, {autorizacion: urlname})
            getGeneral()
            //await addDoc(generalCollection, values))
        }

        const getGeneral = async () =>{

            //const ref = doc(db, 'cursos/xxxx/clase')
            const getBook = await getDocs(generalCollection)

        
            setBook( 
                //getBook.data()
                getBook.docs.map((docs) => ({...docs.data(), id: docs.id}))
            )

            
        }

        useEffect(() =>{
            getGeneral()
        },[])

    return(

        
        <div className='styleBook'>





            <div className="card text-center">
                <div className="card-header border-color">
                    Autorización ejecución de curso
                </div>
                <div className="card-body color-body">
                    
                    <input type='file' className='form-control file' onChange={(e) => setFile(e.target.files[0])}></input>
                     {/*<input type='text' className='form-control text' placeholder='nombre Archivo' onChange={(e) => setNameFile(e.target.value)}></input>*/}
                    <button onClick={submitFile} className="btn btn-book">Subir Autorización</button>
         
                    {book.map((data) => (
                      
                            <ul className="nav" key={data.id}>
                                <li className="nav-item">
                                <a  className='btn color-text' href={data.autorizacion} ><FontAwesomeIcon icon={faFile} /></a>
                                </li>
                            </ul>
                            
                        
                    ))}
                
                
                
                
                
                </div>

            </div>

        </div>
    )
}

export default Execution