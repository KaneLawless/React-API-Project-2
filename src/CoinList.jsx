import { Container, Row, Col } from "react-bootstrap"

export default function CoinList({ coins }) {
    // const { uuid, iconUrl, name, price, marketCap, change } = coins
    // const volume = coins["24hVolume"]

    return (
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
                    <Row key={uuid}>
                        <Col className="col-1">{index + 1}</Col>

                        <Col ><img src={iconUrl} className="img-fluid w-25" />  {name}</Col>
                        <Col >{Number(price).toLocaleString()}</Col>
                        <Col >{Number(marketCap).toLocaleString()}</Col>
                        <Col className="col-1">{change}</Col>
                        <Col>{Number(volume).toLocaleString()}</Col>
                    </Row>
                )
            })}
        </Container>
    )
}