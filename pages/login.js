import React, { Fragment, useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
}
const firebaseErrors = {
  'auth/email-already-in-use': 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
}

export default function Login() {


  const [error, setError] = useState(false);

  const {
    valores,
    errores,
    submitFrom,
    handleChange,
    handleSubmit,
    handleBlur
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  function iniciarSesion() {
    console.log('iniciando sesion');
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
          >Iniciar Sesion</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >

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
            {error ? <Error>{error}</Error> : null}
            <Campo>
              <InputSubmit
                type="submit"
                value="Iniciar Sesion"
              />
            </Campo>


          </Formulario>
        </Fragment>
      </Layout>

    </div>
  )
}
