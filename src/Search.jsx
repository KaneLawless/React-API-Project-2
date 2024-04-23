import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"
import buttonimg from "./images/button-back.png"

export default function Search() {

    const params = useParams()
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState()
    const options = { headers: { 'x-access-token': import.meta.env.VITE_API_KEY } }

    function handleClick(e) {
        navigate(`/coin/${e.target.id}`)
    }

    function goBack() {
        navigate(-1)
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
            {searchData ? <p style={{ color: "white", textAlign: "center" }}>Showing results for "{params.query}" ({searchData.length})</p> : ""}
            <ListGroup className="search-list">
                {searchData ? searchData.map(coin => {
                    return <ListGroup.Item action variant="success" key={coin.uuid} style={{ cursor: "pointer" }} id={coin.uuid} onClick={handleClick}>{coin.name}</ListGroup.Item>
                }) :
                    ""
                }
                <Button className="back-button" onClick={goBack}><img src={buttonimg} /> Back</Button>

            </ListGroup>
        </>
    )
}