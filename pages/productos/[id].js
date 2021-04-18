import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import formarDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
    @media (min-width:768px){
        display: grid;
        grid-template-columns:2fr 1fr;
        column-gap:2rem;
    }
`;

const CreadorProducto = styled.p`
    padding:.5rem 2rem;
    background-color:#da552f;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    display:inline-block;
    text-align:center;
`;


const Producto = () => {

    // state del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarBD, setConsultarBD] = useState(true);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    // context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarBD) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();

                if (producto.exists) {
                    setProducto(producto.data());
                    setConsultarBD(false);
                } else {
                    setError(true);
                    setConsultarBD(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if (Object.keys(producto).length === 0 && !error) return 'Cargando...';

    const { comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, creador, haVotado } = producto;

    // administrar y validar los votos

    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }

        // obtener votos y sumar 1 nuevo
        const nuevotTotal = votos + 1;

        //verificar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) return;

        //guardar el ID del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        //actualizar en la BD
        firebase.db.collection('productos').doc(id).update({ votos: nuevotTotal, haVotado: nuevoHaVotado });

        //actulizar el state
        setProducto({
            ...producto,
            votos: nuevotTotal
        })

        setConsultarBD(true); // hay un voto, por lo tanto consultar a la base de datos
    }

    // funciones para crear comentarios
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    // identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();
        if (!usuario) {
            return router.push('/');
        }

        // informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // actualizar la BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });

        // actilizar el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        });

        setConsultarBD(true); // hay un Comentario, por lo tanto consultar a la base de datos

    }

    // funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if (!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    // elimina un producto de la base de datos
    const eliminarProducto = async () => {
        
        if (!usuario) {
            return router.push('/login');
        }
        if (creador.id !== usuario.uid) {
            return router.push('/');
        }
        
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
     }


    return (
        <Layout>
            <Fragment>
                {error
                    ? <Error404 />
                    :
                    (
                        <div className="contenedor">
                            <h1
                                css={css`
                            text-align:center;
                            margin-top:5rem;
                        `}>{nombre}</h1>
                            <ContenedorProducto>
                                <div>
                                    <p>Publicado hace : {formarDistanceToNow(new Date(creado), { locale: es })}</p>
                                    <p>Por: {creador.nombre} de {empresa}</p>
                                    <img src={urlImagen} alt="" />
                                    <p>{descripcion}</p>

                                    {usuario && (
                                        <Fragment>
                                            <h2>Agrega tu comentario</h2>
                                            <form
                                                onSubmit={agregarComentario}
                                            >
                                                <Campo>
                                                    <input
                                                        type="text"
                                                        name="mensaje"
                                                        onChange={comentarioChange}
                                                    />
                                                </Campo>
                                                <InputSubmit
                                                    type="submit"
                                                    value="Agregar Comentario"
                                                />
                                            </form>
                                        </Fragment>
                                    )}

                                    <h2
                                        css={css`
                                    margin:2rem 0;
                                `}
                                    >Comentarios</h2>
                                    {comentarios.length === 0
                                        ?
                                        "Aún no hay comentarios"
                                        :
                                        (
                                            <ul>
                                                {comentarios.map((comentario, id) => (

                                                    <li
                                                        key={`${comentario.usuarioId}-${id}`}
                                                        css={css`
                                                    border:1px solid #e1e1e1;
                                                    padding:2rem;
                                                `}
                                                    >
                                                        <p>{comentario.mensaje}</p>
                                                        <p>Escrito por:
                                                   <span
                                                                css={css`
                                                            font-weight:bold;
                                                        `}
                                                            >{' '}{comentario.usuarioNombre}</span>
                                                        </p>
                                                        {esCreador(comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
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
                                    >Visitar URl</Boton>


                                    <div
                                        css={css`
                                    margin-top: 5rem;
                                `}
                                    >
                                        <p
                                            css={css`
                                    text-align:center;
                                `}
                                        >{votos} Votos</p>

                                        {usuario && (
                                            <Boton
                                                onClick={votarProducto}
                                            >
                                                Votar
                                            </Boton>
                                        )}
                                    </div>

                                </aside>
                            </ContenedorProducto>
                            {puedeBorrar() &&
                                <Boton
                                    onClick={eliminarProducto}
                                >Eliminar Producto</Boton>
                            }
                        </div>
                    )
                }

            </Fragment>
        </Layout>
    );
}

export default Producto;