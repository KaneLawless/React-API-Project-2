import axios from "axios"
import { useState, useEffect } from "react"
import { Container, Card, Button, Col, Row } from "react-bootstrap"
import { SparklineComponent, Inject, SparklineTooltip } from "@syncfusion/ej2-react-charts"
import { useParams, Link } from "react-router-dom"

export default function SingleCoin() {

    const [coin, setCoin] = useState()
    const [error, setError] = useState()
    const [sparkline, setSparkline] = useState()

    const params = useParams()
    console.log(params)

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`https://api.coinranking.com/v2/coin/${params.uuid}`)
                console.log(data.data.coin)
                setCoin(data.data.coin)
                const spark = data.data.coin.sparkline
                const d = spark.map((price, index) => {
                    return { "x": index, "xval": new Date().getHours() + index, "yval": price }
                })
                console.log(d)
                d[d.length - 1].yval = data.data.coin.price
                setSparkline(d)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }
        getData()


    }, [])

    return (
        <>
            {coin ?
                <Container className="d-flex">
                    <Row>
                        <Col className="col-9">
                            <section>
                                <Card className="d-flex flex-row">
                                    <Card.Img variant="top" src={coin.iconUrl} className="w-25" />
                                    <Card.Body>
                                        <Card.Title>{coin.name}</Card.Title>
                                        <Card.Text>
                                            {coin.description}<br /><br />
                                            Current Price: ${Number(coin.price).toLocaleString()}
                                        </Card.Text>
                                        <Button variant="primary" href={coin.websiteUrl} target={"_blank"}>{coin.websiteUrl}</Button>
                                    </Card.Body>
                                </Card>
                                <div className="container my-4 text-center" >
                                    <SparklineComponent
                                        id='sparkline' height='200px' width='70%' dataSource={sparkline} xName='xval' yName='yval'
                                        markerSettings={{ visible: ['All'] }}
                                        tooltipSettings={{ visible: true, format: '${yval}', }}>
                                        <Inject services={[SparklineTooltip]}
                                            padding={{ left: 30, right: 30, bottom: 30, top: 30 }} />
                                    </SparklineComponent>
                                    <br /><br /><br /><p>Hourly price chart</p>
                                </div>
                            </section>
                        </Col>
                        <Col className="col-3">
                            <section className="mx-4">
                                <h2>Current Supply Data</h2>
                                <p>Total Supply: {Number(coin.supply.total).toLocaleString()} {coin.symbol}</p>
                                <p>Circulating Supply: {Number(coin.supply.circulating).toLocaleString()} {coin.symbol}</p>
                                <p>Max Supply: {coin.supply.max ? Number(coin.supply.max).toLocaleString() : "∞"} {coin.supply.max ? coin.symbol : ""}</p>
                                <p>Current Market Cap: ${Number(coin.marketCap).toLocaleString()}</p>
                                <p>Fully Diluted Market Cap: ${Number(coin.fullyDilutedMarketCap).toLocaleString()}</p>
                                <p>24h Volume: ${Number(coin["24hVolume"]).toLocaleString()}</p>
                                <p>Price all time high: ${Number(coin.allTimeHigh.price).toLocaleString()}</p>
                                <Link variant="warning" to='/'>Back to Home</Link>
                            </section>
                        </Col>
                    </Row>
                </Container > : ""
            }
        </>
    )

}