import React, {useState, useEffect} from 'react';

const useValidation = (stateInicial, validar, fn) => {
    
    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);
    
    useEffect(() => {
        if(submitForm) {
           const noErrores = Object.keys(errores).length === 0;
           
           if(noErrores) {
               fn() //Funcion nque se ejecuta en el componente
           }
           
           guardarSubmitForm(false);
           
        }
    }, [errores]);
    
    //Funcion que se ejecuta cuando el usuario escribe
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    };
    
    //Funcion que se ejecuta que el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };
    
    //onBlur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    };
    
    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
};

export default useValidation;
