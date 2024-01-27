
export async function loader() {
  const respuesta = await fetch(`${process.env.API_URL}/api/guitarras?populate=imagen`);
  const resultado = await respuesta.json()
  return {}
}

function Tienda() {
  return (
    <div>desde tienda.jsx</div>
  )
}

export default Tienda
