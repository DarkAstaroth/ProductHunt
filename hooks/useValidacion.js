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
    }, [errores])

    // funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        });
    }

    // funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitFrom(true);
    }

    // cuando se realiza el evento de blur

    const handleBlur = e => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        submitFrom,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidacion;