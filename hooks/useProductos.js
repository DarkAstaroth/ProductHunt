import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';


const useProductos = (orden,type) => {
    const [productos, setProductos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {

                firebase.db.collection('productos').orderBy(orden, type).onSnapshot(manejarSnapchot);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerProductos();
    }, []);

    function manejarSnapchot(snapshot) {
        const productos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setProductos(productos);
    }

    return {productos}
}

export default useProductos;