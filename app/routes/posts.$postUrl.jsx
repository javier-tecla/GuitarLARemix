import { useLoaderData, isRouteErrorResponse, useNavigate } from '@remix-run/react'
import { getPost } from '~/models/posts.server'
import { formatearFercha } from '~/utils/helpers'
import styles from '~/styles/blog.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta({data}) {
  if (!data || !data.data || data.data.length === 0) {
    return [ 
      { title: 'GuitarLA - Entrada no Encontrada' },
      {
        name: 'description',
        content: 'Guitarras, venta de guitarras, entrada no encontrada',
      },
    ];
  }

  const titulo = data.data[0].attributes.titulo;

  return [
    { title: `GuitarLa - ${titulo}` },
    {
      name: 'description',
      content: `Guitarras, venta de guitarras, entrada ${titulo}`,
    },
  ];
}



export async function loader({params}) {
  const { postUrl } = params
  const post = await getPost(postUrl)
  if(post.data.length === 0) {
      throw new Response('', {
          status: 404,
          statusText: 'Entrada no encontrada'
      })
  }

  return post
}

/** Manejo de errores */
export function ErrorBoundary({ error }) {
  const navigate = useNavigate(); // Utiliza useNavigate fuera del JSX

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p className='error'>{error.status} {error.statusText}</p>
        <button onClick={() => navigate('/')}>Tal vez quieras volver a la página principal</button>
      </div>
    );
  }
  return <p className='error'>404 Entrada  No Encontrada</p>;
}


export default function Post() {

  const post = useLoaderData()
  
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;

  const contenidoText = contenido && contenido[0]?.children[0]?.text || '';

  return (
    <article className='contenedor post mt-3'>
      <img className='imagen' src={imagen?.data?.attributes?.url} alt={`imagen blog ${titulo}`}/>
      <div className="contenido">
            <h3>{titulo}</h3>
            <p className='fecha'>{formatearFercha(publishedAt)}</p>
            <p className='texto'>{contenidoText}</p>
           
            
        </div>

    </article>
  )
}


