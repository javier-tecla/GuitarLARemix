import { useLoaderData } from '@remix-run/react'
import ListadoPosts from '~/components/listado-posts';
import { getPosts } from '~/models/posts.server'
import styles from '~/styles/blog.css'

export function meta({data}) {
  if (!data || !data.data || data.data.length === 0) {
    return [ 
      { title: 'GuitarLA - Nuestro Blog' },
      {
        name: 'description',
        content: 'Guitarras, Blog de música y venta de guitarras',
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

export async function loader() {
  const posts = await getPosts()
return posts.data

}

function Blog() {
  const posts = useLoaderData()

  return (
    <main className="contenedor">
        <ListadoPosts 
            posts={posts}
        />
    </main>
  )
}

export default Blog