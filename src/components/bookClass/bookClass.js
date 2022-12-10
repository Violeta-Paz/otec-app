import React, { useState, useEffect } from 'react';
import './bookClass.css';
import { addFile } from '../../firebase';
import { addDoc, collection, query, getDocs} from 'firebase/firestore'
import db from '../../firebase';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile} from '@fortawesome/free-solid-svg-icons'
const BookClass = () => {

    
    const {id} = useParams();


        const [file, setFile] = useState(null)
        const [nameFile, setNameFile] = useState('')
        const [urlDoc, setUrlDoc] = useState('')
        const [book, setBook] = useState([])
        const generalCollection = query(collection(db, `cursos/${id}/clase`))

        const submitFile = async (e) => {
            try{
                
                const url = await addFile(file, `libro clases ${id}`);
                setUrlDoc(url)
                insert(url)
            } catch(err) {
                console.log(err)
            }

        }

        const insert = async (urlname) =>{
            await addDoc(generalCollection, {libro: urlname})
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
                <div className="card-header header-color">
                    Libro de clases
                </div>
                <div className="card-body color-body">
                    
                    <input type='file' className='form-control file' onChange={(e) => setFile(e.target.files[0])}></input>
                    {/* <input type='text' className='form-control text' placeholder='nombre Archivo' onChange={(e) => setNameFile(e.target.value)}></input>*/}
                    <button onClick={submitFile} className="btn btn-book">Subir libro de clases</button>
         
                    {book.map((data) => (
                      
                            <ul className="nav" key={data.id}>
                                <li className="nav-item">
                                <a  className='btn color-text' href={data.libro} ><FontAwesomeIcon icon={faFile} /></a>
                                </li>
                            </ul>
                            
                        
                    ))}
                
                
                
                
                
                </div>

            </div>

        </div>
    )
}

export default BookClass