import React from 'react';
import { useEffect } from 'react';

const Alert = ({type,msg,removeAlert}) => {
    useEffect(() => {
      const timeOut = setTimeout(()=>{
        removeAlert()
      },2000)
    }, []);
    return (
        <p className={`alert alert-${type}`}>{msg}</p>
    );
}

export default Alert;
