import { Container, Row, Col, Form } from "react-bootstrap"
import { useOutletContext, useNavigate } from "react-router-dom"
import { ListGroup, InputGroup, Button } from "react-bootstrap"
import { useState } from "react"
export default function CoinList() {

    const [search, setSearch] = useState()

    const { coins } = useOutletContext()

    const navigate = useNavigate()


    function handleChange(e) {
        setSearch(e.target.value)
    }

    function loadSingleCoin(e) {
        navigate(`/coin/${e.target.parentElement.id}`)
    }

    function handleSearch() {
        navigate(`/search/${search}`)
    }

    return (
        <>
            <div className="d-flex justify-content-evenly pb-4 top-50">
                <h1 className="mx-4">Today's Top 50 Cryptocurrencies by Market Cap </h1>
                <Form onSubmit={handleSearch}>
                    <InputGroup>
                        <Form.Control placeholder="Search any coin.." id="search" value={search} onChange={handleChange} />
                        <Button variant="outline" className="search-btn" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Form>
            </div>
            {coins ?

                <Container fluid className="ml-4 text-center">
                    <ListGroup>
                        <ListGroup.Item><Row>
                            <Col className="col-1">Rank</Col>
                            <Col >Name</Col>
                            <Col >Price $</Col>
                            <Col >Market Cap $</Col>
                            <Col className="col-1">24hr %</Col>
                            <Col>Volume $</Col>
                        </Row>
                        </ListGroup.Item>
                        {coins.map((coin, index) => {
                            const { uuid, iconUrl, name, price, marketCap, change } = coin
                            const volume = coin["24hVolume"]

                            return (
                                <ListGroup.Item ><Row key={uuid} id={uuid} style={{ cursor: "pointer" }}>
                                    <Col className="col-1" onClick={loadSingleCoin}>{index + 1}</Col>
                                    <Col onClick={loadSingleCoin}><img src={iconUrl} className="img-fluid logo" alt="logo" /> {name}</Col>
                                    <Col onClick={loadSingleCoin} className="text-right">{price < 0.1 ? price : Number(price).toLocaleString()}</Col>
                                    <Col onClick={loadSingleCoin} >{Number(marketCap).toLocaleString()}</Col>
                                    <Col className="col-1" onClick={loadSingleCoin}>{change}</Col>
                                    <Col onClick={loadSingleCoin}>{Number(volume).toLocaleString()}</Col>
                                </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Container >
                : ""
            }
        </>
    )
}