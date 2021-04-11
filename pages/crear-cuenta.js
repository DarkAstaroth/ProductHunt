import React, { Fragment } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit} from '../components/ui/Formulario';

export default function CrearCuenta() {
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
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu Nombre"
              />
            </Campo>

            <Campo>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu Email"
              />
            </Campo>

            <Campo>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
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
