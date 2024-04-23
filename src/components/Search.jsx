import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"
import buttonimg from "../images/button-back.png"
import SearchInput from "./SearchInput"
export default function Search() {

    const params = useParams()
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState()
    const options = { headers: { 'x-access-token': import.meta.env.VITE_API_KEY } }
    const [error, setError] = useState()

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

                setSearchData(data.data.coins)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }

        getData()
    }, [])

    return (
        <>
            <div >
                {searchData ?
                    <p style={{ color: "white", textAlign: "center", marginTop: "30px" }}>
                        Showing results for "{params.query}" ({searchData.length})</p>
                    : error && <p className="text-danger">{error}</p>
                }
                <ListGroup className="search-list my-5">
                    <SearchInput />
                    <hr />
                    {searchData ? searchData.map(coin => {
                        return <ListGroup.Item
                            key={coin.uuid} style={{ cursor: "pointer" }}
                            id={coin.uuid} onClick={handleClick}>{coin.name}
                        </ListGroup.Item>
                    }) :
                        ""
                    }
                    <Button className="back-button" onClick={goBack}><img src={buttonimg} /> Back</Button>

                </ListGroup>
            </div>
        </>
    )
}