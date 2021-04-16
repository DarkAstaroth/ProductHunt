import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
const Producto = () => {

    // state del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    // context de firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();

                if (producto.exists) {
                    setProducto(producto.data());
                } else {
                    setError(true);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    return (
        <Layout>
            <Fragment>
                {error && <Error404 />}
            </Fragment>
        </Layout>
    );
}

export default Producto;