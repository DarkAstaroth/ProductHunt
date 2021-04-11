import React, { useState , useEffect } from 'react';

const useValidacion = (stateInicial, validar,fn) => {
    
    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitFrom, setSubmitFrom] = useState(false);

    useEffect(() => {
        if (submitFrom) {
            const noErrores = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); // FN = funcion que se ejecuta en el componente
            }
            setSubmitFrom(false);
       }
    }, [])

    return (
        
     );
}
 
export default useValidacion;