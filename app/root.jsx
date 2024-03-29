import { useState, useEffect } from 'react'

import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload
   
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

export function meta({ error }) {
 
    if (error?.status === 404) {
 
       return [
 
           {
             title: 'Guitarra no encontrada',
             description: 'Guitarras, venta de Guitarras, guitarra no encontrada'
           }
        ]
    }
   
    return (
        [
            { charset: 'utf-8' },
            { title: 'GuitarLA - remix' },
            { viewport: 'width=device-width,initial-scale=1' }
        ]
    )
} 

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}


export default function App() {


    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
        
    }, [carrito])

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map( guitarraState => {
                if(guitarraState.id === guitarra.id ) {
                    // Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            // Añadir al carrito
            setCarrito(carritoActualizado)
        } else {
            // Registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document({children}) {
    return  (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer/>
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

