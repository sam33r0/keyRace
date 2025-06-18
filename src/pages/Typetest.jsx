import Typetesting from '../components/Typetesting'

function Typetest() {
    const par = [...'Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest – the majestic Gunung Rinjani is an active volcano. It is the second highest peak in Indonesia. Art is a Balinese passion. Batik paintings and carved statues make popular souvenirs.']

    return (
        <div className='w-screen h-screen flex justify-center items-start p-20 bg-black'>
            <Typetesting par={par} />
        </div>
    )
}

export default Typetest