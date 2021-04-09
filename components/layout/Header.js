import React from 'react';
import Buscar from '../ui/Buscar'
import Navagacion from './Navegacion'
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ContenedorHeader = styled.div`
    max-width:1200px;
    width:95%;
    margin: 0 auto;
    @media (min-width:768px){
        display:flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color : var(--naranja);
    font-size: 4rem;
    line-height:0;
    font-family:'Ubuntu',serif;
    margin-right: 3rem;
`;

const Header = () => {
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem;
            `}
        >
            <ContenedorHeader>
                <div>

                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Buscar />
                    <Navagacion />
                </div>

                <div>
                    <p>Hola : Manuel</p>
                    <button type="button">Cerrar Sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear cuenta</Link>
                </div>
            </ContenedorHeader>
        </header>
    );
}

export default Header;