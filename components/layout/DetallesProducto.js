import React from 'react';
import styled from "@emotion/styled";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';

const Imagen = styled.img`
  width: 200px;
`;
const Comentario = styled.img`
  width: 20px;
`;

const DetallesProducto = ({producto}) => {
    
    const {id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos} = producto;
    
    return (
    
        <li>
            <div>
                <div>
                    <Imagen src={urlimagen} alt=""/>
                </div>
                <div>
                    <h1>{nombre}</h1>
                    <p>{descripcion}</p>
                    <div>
                        <Comentario src="/static/img/comentario.png" alt=""/>
                        <p>{comentarios.length} comentarios</p>
                    </div>
                    <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                </div>
            </div>
            <div>
                <div>&#9650;</div>
                <div>{votos}</div>
            </div>
        </li>
    );
};

export default DetallesProducto;
