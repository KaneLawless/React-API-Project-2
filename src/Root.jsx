import axios from 'axios'
import { useEffect, useState } from 'react'
import StatsBar from './StatsBar'
import CoinList from './CoinList'

function Root() {

    const [coins, setCoins] = useState()
    const [stats, setStats] = useState()
    const [error, setError] = useState()

    const headers = { 'x-access-token': import.meta.env.VITE_API_KEY }

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('https://api.coinranking.com/v2/coins', headers)
                console.log(res.data.data.stats)
                console.log(res.data.data.coins)
                setCoins(res.data.data.coins)
                setStats(res.data.data.stats)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }

        getData()
    }, [])

    return (
        <>
            {stats ? <StatsBar stats={stats} /> : ""}
            <h1 className="text-center">Top 50 Coins</h1>
            {coins ? <CoinList coins={coins} /> : ""}
        </>
    )
}

export default Root
