import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';

export default function CrearCuenta() {
  return (
    <div>
      <Layout>
        <Fragment>
          <h1>Crear Cuenta</h1>
          <form>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu Nombre"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Tu Email"
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
              />
            </div>

            <div>
              <input
                type="submit"
                value="Crear cuenta"
              />
            </div>

            
          </form>
        </Fragment>
      </Layout>

    </div>
  )
}
