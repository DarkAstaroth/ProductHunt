import React, { Fragment, useState, useContext } from 'react';
import { css } from '@emotion/react';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import Swal from 'sweetalert2'


import { FirebaseContext } from '../firebase';
import Error404 from '../components/layout/404';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  url: '',
  urlImagen: '',
  descripcion: ''
}
const firebaseErrors = {
  'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
}

export default function NuevoProducto() {

  // state de las imagene

  const [nombreImagen, setNombreImagen] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState('');

  const [error, setError] = useState(false);

  const {
    valores,
    errores,
    submitFrom,
    handleChange,
    handleSubmit,
    handleBlur
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();

  async function crearProducto() {
    try {

      if (!usuario) {
        return router.push('/');
      }
      const producto = {
        nombre,
        empresa,
        url,
        urlImagen,
        descripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
        creador: {
          id: usuario.uid,
          nombre: usuario.displayName
        },
        haVotado:[]
      }

      await firebase.db.collection('productos').add(producto);

      Swal.fire(
        'Buen trabajo!',
        'Producto registrado con exito!',
        'success'
      );

      return router.push('/');

    } catch (error) {
      console.error('Hubo un error al crear el producto', error.code);
      throw firebaseErrors[error.code] || error.message,
      console.log(error);
    }
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  }

  const handleProgress = progreso => {
    setProgreso({ progreso })
  }

  const handleUploadError = error => {
    setSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = async nombre => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        setUrlImagen(url);
      });
  };



  return (
    <div>
      <Layout>

        {!usuario
          ? <Error404 />
          : <Fragment>
            <h1
              css={css`
              text-align:center;
              margin-top:5rem;
            `}
            >Nuevo Producto</h1>
            <Formulario
              onSubmit={handleSubmit}
              noValidate
            >

              <fieldset>
                <legend>Informacion General</legend>
                <Campo>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="empresa">Empresa:</label>
                  <input
                    type="text"
                    name="empresa"
                    id="empresa"
                    placeholder="Nombre de Empresa o Compañia"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error>}

                <Campo>
                  <label htmlFor="imagen">Imagen:</label>
                  <FileUploader
                    accept="image/*"
                    name="imagen"
                    id="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="url">Url:</label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    placeholder="URL de tu producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>Sobre tu producto</legend>
                <Campo>
                  <label htmlFor="descripcion">Descripcion:</label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>




              {error ? <Error>{error}</Error> : null}
              <Campo>
                <InputSubmit
                  type="submit"
                  value="Crear Producto"
                />
              </Campo>


            </Formulario>
          </Fragment>
        }

      </Layout>

    </div>
  )
}
