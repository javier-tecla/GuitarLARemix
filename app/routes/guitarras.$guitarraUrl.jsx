import { useLoaderData } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'
import styles from '~/styles/guitarras.css'

export function meta({data}) {

    return [
      {title: `GuitarLa - ${data.data[0].attributes.nombre}`},
      {
       name: "description",
       content: `Guitarras, venta de guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
      } 
    ]  
}

export function links() {
    return [
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
}

export async function loader({params}) {

      const { guitarraUrl } = params

      const guitarra = await getGuitarra( guitarraUrl )
      

      return guitarra

}

function Guitarra() {

  const guitarra = useLoaderData()
  const { nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  const descripcionText = descripcion && descripcion[0]?.children[0]?.text || '';

  return (
    <main className='contenedor guitarra'>
        <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

        <div className='contenido'>
            <h3>{nombre}</h3>
            <p className='texto'>{descripcionText}</p>
            <p className='precio'>{precio}</p>
        </div>
    </main>
  )
}

export default Guitarra
