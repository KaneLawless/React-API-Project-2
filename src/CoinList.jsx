import { Container, Row, Col } from "react-bootstrap"
import { useOutletContext, useNavigate } from "react-router-dom"

export default function CoinList() {
    

    const { coins } = useOutletContext()

    const navigate = useNavigate()

    function loadSingleCoin(e) {
        navigate(`/coin/${e.target.parentElement.id}`)
    }

    function handleSearch(e) {
        e.preventDefault()
        console.log(e.target.lastChild.value)
        navigate(`/search/${e.target.lastChild.value}`)
    }

    return (
        <>
            <header className="d-flex justify-content-between px-4 pb-4">
                <h1 className="mx-4">Top 50 Coins</h1>
                <form type="submit" onSubmit={handleSearch} >
                    <input type="search" name="search" id="search" placeholder="Search any coin..." />
                </form>
            </header>
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