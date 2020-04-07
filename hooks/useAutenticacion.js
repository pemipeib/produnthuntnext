import React, {useEffect, useState} from 'react';
import firebase from "../firebase";

function UseAutenticacion() {
    const [usarioAutenticado, guardarUsarioAutenticado] = useState(null);
    
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsarioAutenticado(usuario);
            }else {
                guardarUsarioAutenticado(null);
            }
        });
        
        return () => unsubscribe();
        
    }, []);
    
    return usarioAutenticado;
}

export default UseAutenticacion;
