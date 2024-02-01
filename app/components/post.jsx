import { Link } from '@remix-run/react'
import { formatearFercha } from '~/utils/helpers'

export default function Post({post}) {

    const {contenido, imagen, titulo, url, publishedAt } = post

    const contenidoText = contenido && contenido[0]?.children[0]?.text || '';

  return (
    <article className="post">
        <img className="imagen" src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className='fecha'>{formatearFercha(publishedAt)}</p>
            <p className="resumen">{contenidoText}</p>
            <Link className='enlace' to={`/posts/${url}`}>Leer Post</Link>
            
        </div>
    </article>
  )
}



