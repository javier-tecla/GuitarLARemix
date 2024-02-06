import { useLoaderData, isRouteErrorResponse, useNavigate } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'
import styles from '~/styles/guitarras.css'

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response('Guitarra No Encontrada', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return guitarra;
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
  return <p className='error'>404 Guitarra No Encontrada</p>;
}


export function meta({data}) {
  if (!data || !data.data || data.data.length === 0) {
    return [ 
      { title: 'GuitarLA - Guitarra No Encontrada' },
      {
        name: 'description',
        content: 'Guitarras, venta de guitarras, guitarra no encontrada',
      },
    ];
  }

  const guitarraNombre = data.data[0].attributes.nombre;

  return [
    { title: `GuitarLa - ${guitarraNombre}` },
    {
      name: 'description',
      content: `Guitarras, venta de guitarras, guitarra ${guitarraNombre}`,
    },
  ];
}

export function links() {
    return [
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
}


function Guitarra() {
  const guitarra = useLoaderData();

  // Verifica si guitarra.data está definido antes de acceder a sus propiedades
  const nombre = guitarra?.data?.[0]?.attributes?.nombre;
  const descripcion = guitarra?.data?.[0]?.attributes?.descripcion;
  const imagenUrl = guitarra?.data?.[0]?.attributes?.imagen?.data?.attributes?.url;
  const precio = guitarra?.data?.[0]?.attributes?.precio;

  const descripcionText = descripcion && descripcion[0]?.children[0]?.text || '';

  return (
    <main className='contenedor guitarra'>
        {/* Verifica si imagenUrl está definido antes de renderizar la imagen */}
        {imagenUrl && <img className='imagen' src={imagenUrl} alt={`Imagen de la guitarra ${nombre}`} />}

        <div className='contenido'>
            <h3>{nombre}</h3>
            <p className='texto'>{descripcionText}</p>
            <p className='precio'>{precio}</p>

            <form className='formulario'>
              <label htmlFor='cantidad'>Cantidad</label>

              <select id="cantidad">
                <option value="">-- Seleccione --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <input 
                  type="submit" 
                  value="Agregar al carrito"
              />
            </form>
        </div>
    </main>
  );
}

export default Guitarra;
