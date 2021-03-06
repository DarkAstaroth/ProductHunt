import React, { Fragment, useContext } from 'react';
import Buscar from '../ui/Buscar'
import Navagacion from './Navegacion'
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Boton from '../ui/Boton';
import { FirebaseContext } from '../../firebase';

const ContenedorHeader = styled.div`
    max-width:1200px;
    width:95%;
    margin: 0 auto;
    @media (min-width:768px){
        display:flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color : var(--naranja);
    font-size: 4rem;
    line-height:0;
    font-family:'Ubuntu',serif;
    margin-right: 3rem;
    
    &:hover{
        cursor:pointer;
    }
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >

                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Buscar />
                    <Navagacion />
                </div>

                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >
                    {
                        usuario ? (
                            <Fragment>
                                <p
                                    css={css`
                                        margin-right:2rem;
                                    `}
                                >Hola : {usuario.displayName}</p>

                                <Boton
                                    bgColor="true"
                                    onClick={() => firebase.cerrarSesion()}
                                >Cerrar Sesi??n</Boton>

                            </Fragment>
                        ) : (
                            <Fragment>
                                <Link href="/login">
                                    <Boton
                                        bgColor="true"
                                    >Login</Boton>
                                </Link>
                                <Link href="/crear-cuenta">
                                    <Boton>Crear cuenta</Boton>
                                </Link>
                            </Fragment>
                        )
                    }
                </div>
            </ContenedorHeader>
        </header>
    );
}

export default Header;