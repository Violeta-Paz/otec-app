import React from 'react';
import TableGeneral from '../components/tableGeneral/tableGeneral';
import '../components/tableGeneral/tableGeneral.css'


import NavRoutes from '../components/navRoutes/navRoutes';

const General = () => {
    return(
        <div>
           
            <NavRoutes/>
            <TableGeneral />

        </div>
    )
}

export default General