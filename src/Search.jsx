import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Search() {

    const params = useParams()

    const navigate = useNavigate()
    const [searchData, setSearchData] = useState()
    const options = {headers : {'x-access-token': import.meta.env.VITE_API_KEY }}

    function handleClick(e) {
        navigate(`/coin/${e.target.id}`)
    }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`https://api.coinranking.com/v2/search-suggestions?query=${params.query}`, options)

                console.log(data.data.coins)
                setSearchData(data.data.coins)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])

    return (
        <>
            {searchData ? searchData.map(coin => {
                return <p key={coin.uuid} style={{ cursor: "pointer" }} id={coin.uuid} onClick={handleClick}>{coin.name}</p>
            }) :
                ""
            }
        </>
    )
}