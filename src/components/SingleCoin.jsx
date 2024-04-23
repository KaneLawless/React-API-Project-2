import axios from "axios"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container, Card, Button, Col, Row } from "react-bootstrap"

import { SparklineComponent, Inject, SparklineTooltip } from "@syncfusion/ej2-react-charts"

import buttonimg from "../images/button-back.png"
import SearchInput from "./SearchInput"

export default function SingleCoin() {

    const options = { headers: { 'x-access-token': import.meta.env.VITE_API_KEY } }

    const [coin, setCoin] = useState()
    const [error, setError] = useState()
    const [sparkline, setSparkline] = useState()

    const navigate = useNavigate()
    const params = useParams()


    function goBack() {
        navigate(-1) || navigate('/')
    }

    // Query single coin data and generate sparkline data
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`https://api.coinranking.com/v2/coin/${params.uuid}`, options)
                setCoin(data.data.coin)
                const spark = data.data.coin.sparkline
                const d = spark.map((price, index) => {
                    return { "x": index, "xval": index, "yval": price }
                })
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
                <Container >
                    <Row>
                        <Col className="col-8">
                            {/* Left section - Info card and sparkline */}
                            <section >
                                <Card className="d-flex flex-row p-2">
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
                                <div className="container my-4 text-center sparkline" >
                                    <SparklineComponent
                                        id='sparkline' height='200px' width='90%' dataSource={sparkline} xName='xval' yName='yval'
                                        markerSettings={{ visible: ['All'] }}
                                        tooltipSettings={{ visible: true, format: '${yval}', }}>
                                        <Inject services={[SparklineTooltip]}
                                        />
                                    </SparklineComponent>
                                    <br /><br /><p>Hourly price chart (24h)</p>
                                </div>
                            </section>
                        </Col>
                        {/*Right section - supply data */}
                        <Col className="col-4">
                            <section className="mx-4 supply-data-div">
                                <h2>Current Supply Data</h2>
                                <p>Total Supply: {Number(coin.supply.total).toLocaleString()} {coin.symbol}</p>
                                <p>Circulating Supply: {Number(coin.supply.circulating).toLocaleString()} {coin.symbol}</p>
                                <p>Max Supply: {coin.supply.max ? Number(coin.supply.max).toLocaleString() : "∞"} {coin.supply.max ? coin.symbol : ""}</p>
                                <p>Current Market Cap: ${Number(coin.marketCap).toLocaleString()}</p>
                                <p>Fully Diluted Market Cap: ${Number(coin.fullyDilutedMarketCap).toLocaleString()}</p>
                                <p>24h Volume: ${Number(coin["24hVolume"]).toLocaleString()}</p>
                                <p>Price all time high: ${Number(coin.allTimeHigh.price) <= 0.1 ? coin.allTimeHigh.price : Number(coin.allTimeHigh.price).toLocaleString()}</p>
                                <Button className="back-button " onClick={goBack}><img src={buttonimg} /> Back</Button>
                                <hr />
                                <SearchInput />
                            </section>
                        </Col>
                    </Row>
                </Container > : error && <p className="text-danger text-center">{error}</p>
            }
        </>
    )

}