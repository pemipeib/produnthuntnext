import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import Layout from "../../components/layout/Layout";
import {FirebaseContext} from '../../firebase'
import Error404 from "../../components/layout/404";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {Campo, InputSubmit} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";


const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;

const Producto = () => {
    
    //state del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    
    //context de firebase
    const {firebase, usuario} = useContext(FirebaseContext);
    
    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado} = producto;
    
    //Routin para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;
    
    
    useEffect(() => {
        if(id){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                }else {
                    guardarError(true);
                }
            };
            obtenerProducto();
        }
    }, [id, producto]);
    
    if(Object.keys(producto).length === 0) return 'Cargando';
    
    //administrar botos
    const votarProducto= () => {
        if(!usuario) {
            return router.push('/login');
        }
        
        //Obtener y sumar votos
        const nuevoTotal = votos + 1;
        
        //Verificar si ya ha votado
        if(haVotado.includes(usuario.uid)) return;
        
        //Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];
        
        //Actualizar la bd
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal,
            havotado: nuevoHaVotado
        });
    
        // Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
    };
    
    return (
        <Layout>
            <>
                {error
                    ? <Error404/>
                    : null
                }
                
                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{nombre}</h1>
                
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                            <p>Por {creador.nombre} de {empresa}</p>
                            <img
                                src={urlimagen}
                                css={css`
                                  height: 200px;
                            `}/>
                            <p>{descripcion}</p>
                            
                            {usuario && (
                                <>
                                    <h2>Comentario</h2>
                                    <form action="">
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Enviar comentario"
                                        />
                                    </form>
                                </>
                            )}
                            
                            <h2
                                css={css`
                                  margin: 2rem 0;
                                `}
                            >Comentarios</h2>
                            {comentarios.map(comentario => (
                                <li>
                                    <p>{comentario.nombre}</p>
                                    <p>Escrito por: {comentario.usuarioNombre}</p>
                                </li>
                            ))}
                            
                        </div>
                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Boton>
                            
                            <div
                                css={css`
                                margin-top: 5rem;
                            `}>
                                <p css={css`
                                  text-align: center;
                                `}
                                >{votos} Votos</p>
                                
                                {usuario && (
                                    <>
                                        <Boton
                                            onClick={votarProducto}
                                        >Votar</Boton>
                                    </>
                                )}
                                
                            </div>
                            
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
};
    
    export default Producto;
