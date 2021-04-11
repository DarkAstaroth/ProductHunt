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
  'auth/user-not-found': 'No hay ningún registro de usuario que corresponda a este email',
  'auth/wrong-password': 'La contraseña no es válida o el usuario no tiene contraseña.',
  'auth/too-many-requests':'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión'
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

  async function iniciarSesion() {
    try {

      await firebase.login(email, password);
      Router.push('/');

    } catch (error) {
      console.log(error.message);
      console.log(error.code);
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
