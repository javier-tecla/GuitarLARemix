
export async function loader({request, params}) {

      const { guitarraUrl } = params

      console.log(guitarraUrl)

      return {}

}

function Guitarra() {
  return (
    <div>$guitarraUrl</div>
  )
}

export default Guitarra
