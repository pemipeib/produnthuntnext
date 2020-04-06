import React,{useState} from 'react';
import {css} from "@emotion/core";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {Formulario, Campo, InputSubmit, Error} from "../components/ui/Formulario";

import firebase from "../firebase";

const STATE_INICIAL = {
    email: '',
    password: ''
};


//validaciones
import useValidation from "../hooks/useValidation";
import validarCrearCuenta from "../validacion/validarIniciarSesion";

const Login = () => {
    
    const [error, guardarError] = useState(false);
    
    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    } = useValidation(STATE_INICIAL,validarCrearCuenta, iniciarSesion);
    
    const {email, password} = valores;
    
    function iniciarSesion() {
        console.log('Iniciando sesión...');
    }
    
    return  (
        <div>
            <Layout>
                <h1
                    css={css`
                  text-align: center;
                  margin-top: 5rem;
                  text-transform: uppercase;
                `}
                >Iniciar sesión</h1>
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    
                    <Campo>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Tu email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.email && <Error>{errores.email}</Error>}
                    <Campo>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Tu password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.password && <Error>{errores.password}</Error>}
                    {error && <Error>{error}</Error>}
                    <InputSubmit
                        type="submit"
                        value="Iniciar sesión"
                    />
                </Formulario>
            </Layout>
        </div>
    )
};

export default Login;
