import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Producto = () => {

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {
        if (id) {
            
        }
    }, [id])

    return (
        <h1>desde [id]</h1>
     );
}
 
export default Producto;