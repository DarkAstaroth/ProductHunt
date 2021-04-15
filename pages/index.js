import React,{ useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';

export default function Home() {

  const [productos, setProductos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {

        firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapchot);

      } catch (error) {
        
      }
    }
    obtenerProductos();
  }, []);

  function manejarSnapchot (snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    setProductos(productos);
  }

  return (
    <div>
      <Layout>
        <h1>Inicio</h1>
      </Layout>

    </div>
  )
}
