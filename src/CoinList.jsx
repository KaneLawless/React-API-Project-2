import { Container, Row, Col } from "react-bootstrap"
import { useOutletContext, useNavigate, useParams, Link } from "react-router-dom"

export default function CoinList() {


    const { coins } = useOutletContext()

    const navigate = useNavigate()

    function loadSingleCoin(e) {
        navigate(`/coin/${e.target.parentElement.id}`)
    }


    return (
        <>
            <h1 className="text-center">Top 50 Coins</h1>
            {coins ?
                <Container fluid className="mx-4">
                    <Row>
                        <Col className="col-1">Rank</Col>
                        <Col >Name</Col>
                        <Col >Price $</Col>
                        <Col >Market Cap</Col>
                        <Col className="col-1">24hr %</Col>
                        <Col>Volume $</Col>
                    </Row>
                    {coins.map((coin, index) => {
                        const { uuid, iconUrl, name, price, marketCap, change } = coin
                        const volume = coin["24hVolume"]

                        return (
                            <Row key={uuid} id={uuid} style={{ cursor: "pointer" }}>
                                <Col className="col-1" onClick={loadSingleCoin}>{index + 1}</Col>
                                <Col onClick={loadSingleCoin}><img src={iconUrl} className="img-fluid w-25" />  {name}</Col>
                                <Col onClick={loadSingleCoin}>{Number(price).toLocaleString()}</Col>
                                <Col onClick={loadSingleCoin}>{Number(marketCap).toLocaleString()}</Col>
                                <Col className="col-1" onClick={loadSingleCoin}>{change}</Col>
                                <Col onClick={loadSingleCoin}>{Number(volume).toLocaleString()}</Col>
                            </Row>
                        )
                    })}
                </Container>
                : ""}
        </>
    )
}