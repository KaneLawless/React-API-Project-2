import { useOutletContext, useNavigate } from "react-router-dom"
import { ListGroup, Container, Row, Col } from "react-bootstrap"
import SearchInput from "./SearchInput"

export default function CoinList() {
    // Pass props from Root
    const { coins } = useOutletContext()
    const navigate = useNavigate()

    // Navigate to single coin page
    function loadSingleCoin(e) {
        navigate(`/coin/${e.target.parentElement.id}`)
    }

    return (
        <>
            {/*Header and search component */}
            <div className="d-flex justify-content-evenly align-items-center pb-4 top-50 ">
                <h1 className="mx-4">Today's Top 50 Cryptocurrencies by Market Cap </h1>
                <SearchInput />
            </div>
            {coins ?
                <Container fluid className="ml-4 text-center">
                    <ListGroup>
                        {/*Column Headers */}
                        <ListGroup.Item key="headers"><Row>
                            <Col className="col-1">Rank</Col>
                            <Col >Name</Col>
                            <Col >Price $</Col>
                            <Col >Market Cap $</Col>
                            <Col className="col-1">24hr %</Col>
                            <Col> 24h Volume $</Col>
                        </Row>
                        </ListGroup.Item>
                        {/*Generate and format column data, on Click navigate to individual coin page*/}
                        {coins.map((coin, index) => {
                            const { uuid, iconUrl, name, price, marketCap, change } = coin
                            const volume = coin["24hVolume"]

                            return (
                                <ListGroup.Item key={uuid}>
                                    <Row id={uuid} style={{ cursor: "pointer" }}>
                                        <Col className="col-1" onClick={loadSingleCoin}>{index + 1}</Col>
                                        <Col onClick={loadSingleCoin}><img src={iconUrl} className="img-fluid logo" alt="logo" /> {name}</Col>
                                        <Col onClick={loadSingleCoin} className="text-right" >{price < 0.1 ? price : Number(price).toLocaleString()}</Col>
                                        <Col onClick={loadSingleCoin} >{Number(marketCap).toLocaleString()}</Col>
                                        <Col onClick={loadSingleCoin} className={change >= 0 ? "col-1 text-success" : "col-1 text-danger"}>{change}</Col>
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