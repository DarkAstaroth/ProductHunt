import React, { Fragment } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password:''
}

export default function CrearCuenta() {

  const {
        valores,
        errores,
        submitFrom,
        handleChange,
        handleSubmit
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, CrearCuenta);

  const { nombre, email, password } = valores;
  
  function CrearCuenta() {
    console.log("Creando cuenta...")
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
              />
            </Campo>

            <Campo>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu Email"
                value={email}
                onChange={handleChange}
              />
            </Campo>

            <Campo>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
                value={password}
                onChange={handleChange}
              />
            </Campo>

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
