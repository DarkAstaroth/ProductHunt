import React from 'react';
import Buscar from '../ui/Buscar'
import Navagacion from './Navegacion'
import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>p</p>
                    <Buscar />
                    <Navagacion />
                </div>

                <div>
                    <p>Hola : Manuel</p>
                    <button type="button">Cerrar Sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear cuenta</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;