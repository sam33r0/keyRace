import { useEffect, useState } from 'react'
import Typetesting from '../components/Typetesting'
import axios from 'axios'

function Typetest() {
    const [par, setPar] = useState(null)
    // const par = [...'Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest – the majestic Gunung Rinjani is an active volcano. It is the second highest peak in Indonesia. Art is a Balinese passion. Batik paintings and carved statues make popular souvenirs.']
    const callData = async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/paragraph`);
            // console.log(res);
            setPar(res.data.par);
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        callData();
    }, [])
    return (
        <div className='w-screen h-[80vh] flex justify-center items-start p-20 bg-black'>
            {par && <Typetesting par={[...par]} />}
            {/* <Typetesting par={[...'sameer srivastava']} /> */}
        </div>
    )
}

export default Typetest