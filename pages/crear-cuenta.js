import React, { Fragment, useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit,Error } from '../components/ui/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password:''
}
const firebaseErrors = {
  'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
}

export default function CrearCuenta() {

  const [error, setError] = useState(false);

  const {
        valores,
        errores,
        submitFrom,
        handleChange,
        handleSubmit,
        handleBlur
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;
  
  async function crearCuenta() {
    try {

      await firebase.registrar(nombre, email, password);
      Router.push('/');

    } catch (error) {
      //console.error('Hubo un error al crear el usuario', error.code);
      throw firebaseErrors[error.code] || error.message,
      setError(firebaseErrors[error.code]);
    }
  }

  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align:center;
              margin-top:5rem;
            `}
          >Crear Cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            {error ? <Error>{error}</Error>:null}
            <Campo>
              <InputSubmit
                type="submit"
                value="Crear cuenta"
              />
            </Campo>

            
          </Formulario>
        </Fragment>
      </Layout>

    </div>
  )
}
