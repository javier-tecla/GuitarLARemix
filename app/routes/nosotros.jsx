import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return [
      
    {title: 'GuitarLA - Sobre Nosotros'},
    {
      name: "description",
      content: 'Venta de guitarras, blog de música'
    }
  ]
}
  
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'img'
    }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
        <h2 className="heading">Nosotros</h2>

        <div className="contenido">
            <img src={imagen} alt="imagen sobre nosotros"/>

            <div>
              <p>Vivamus nec eleifend risus. In eget nisi vel mauris tincidunt tincidunt. Morbi eu augue sit amet dui lobortis rhoncus. Ut turpis libero, maximus ac purus id, ornare maximus neque. Sed vitae tempor arcu, vel commodo est. Nunc eu aliquet neque, Morbi gravida maximus velit, sit amet pellentesque nibh.</p>

              <p>Nam tristique, augue ac imperdiet interdum, orci arcu auctor est, nec consectetur nisl mauris non neque. Curabitur feugiat ullamcorper lorem ac faucibus. Ut convallis sem sit amet mi venenatis dapibus. Phasellus ac tortor ut nibh pulvinar pharetra finibus nec neque. Aliquam gravida pellentesque gravida. Mauris augue velit, ornare eu ex at, efficitur suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    </main>
  )
}

export default Nosotros
