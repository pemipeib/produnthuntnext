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

const CreadorProducto = styled.p`
  padding: .5rem 2rem;
  background-color: #da552f;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
`;

const Producto = () => {
    
    //state del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});
    const [condultaraDB, guardarConsultarDB] = useState(true);
    
    //context de firebase
    const {firebase, usuario} = useContext(FirebaseContext);
    
    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado} = producto;
    
    //Routin para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;
    
    
    useEffect(() => {
        if(id && condultaraDB){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                    guardarConsultarDB(false);
                }else {
                    guardarError(true);
                    guardarConsultarDB(false);
                }
            };
            obtenerProducto();
        }
    }, [id]);
    
    if(Object.keys(producto).length === 0 && !error) return 'Cargando';
    
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
        });
        guardarConsultarDB(true);
    };
    
    //funcion para crear comentarios
    const comnentarioChangg = e => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    };
    
    //averiguar si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id == id) {
            return true;
        }
    };
    
    const agregarComentario = e => {
        e.preventDefault();
        if(!usuario) {
            return router.push('/login');
        }
        
        //Informacion extra del comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;
        
        //Copia de comentario y añadirlo al array
        const nuevosComentarios = [...comentarios, comentario];
        
        //Actualizar bd
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });
        
        //actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        });
        guardarConsultarDB(true);
    };
    
    //funcion para el revisar que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if (!usuario) return false;
        
        if (creador.id === usuario.uid) return true;
    };
    
    //elimina un producto
    const eliminarProducto = () => {
        if(!usuario) {
            return router.push('/');
        }
        if (creador.id !== usuario.uid) {
            return router.push('/');
        }
    
        try {
            firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        
        }catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Layout>
            <>
                {error
                    ? <Error404/>
                    : (
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
                                            <form
                                                onSubmit={agregarComentario}
                                            >
                                                <Campo>
                                                    <input
                                                        type="text"
                                                        name="mensaje"
                                                        onChange={comnentarioChangg}
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
                                    {comentarios.length === 0
                                        ? <p>Sin comentarios</p>
                                        :(
                                            <ul>
                                                {comentarios.map((comentario, i) => (
                                                    <li
                                                        key={`${comentario.usuarioId}-${i}`}
                                                        css={css`
                                                  border: 1px solid var(--gris3);
                                                  padding: 2rem;
                                                  border-radius: 5px;
                                                `}
                                                    >
                                                        <p>{comentario.mensaje}</p>
                                                        <p>Escrito por: {' '}
                                                            <span
                                                                css={css`
                                                          font-weight: bold;
                                                        `}
                                                            >{comentario.usuarioNombre}</span>
                                                        </p>
                                                        {esCreador(comentario.usuarioId) && <CreadorProducto>Es creador</CreadorProducto>}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                
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
                            {puedeBorrar() &&
                                <Boton
                                    onClick={eliminarProducto}
                                >Eliminar producto</Boton>
                            }
                        </div>
                    )
                }
            </>
        </Layout>
    );
};
    
    export default Producto;
