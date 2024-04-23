import axios from 'axios'

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from "./components/Footer.jsx"
import StatsBar from './components/StatsBar'
import Loading from './components/Loading.jsx'


function Root() {

    const [coins, setCoins] = useState()
    const [stats, setStats] = useState()
    const [error, setError] = useState()

    const options = { headers: { 'x-access-token': import.meta.env.VITE_API_KEY } }


    // Retrieve top 50 coins data
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('https://api.coinranking.com/v2/coins', options)
                setCoins(res.data.data.coins)
                setStats(res.data.data.stats)
            } catch (error) {
                setError(error.message)
            }
        }
        getData()


    }, [])

    return (
        <>  
            {/* Generate stats bar after data is retrieved and Load active route*/}
            {stats ? <StatsBar stats={stats} /> :
              error ? <p variant="danger">{error}</p> : <div className='text-center my-5'> <Loading /></div>}
            <Outlet context={{ coins }} />
            <Footer />

        </>

    )
}

export default Root
