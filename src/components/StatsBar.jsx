import logo from "../images/coinrank.png"
import { useNavigate } from "react-router-dom"

export default function StatsBar({ stats }) {

    const navigate = useNavigate();

    function goHome() {
        navigate('./')
    }
    let { total, totalExchanges, totalMarketCap, total24hVolume } = stats

    return (
        <header className="d-flex justify-content-evenly mb-4 text-center">
            <img src={logo} alt="logo" className="cr-logo" onClick={goHome} />
            <h5>Coins: {Number(total).toLocaleString()}</h5>
            <h5>Exchanges: {totalExchanges}</h5>
            <h5>Market Cap: ${Number(totalMarketCap).toLocaleString()}</h5>
            <h5>Volume 24hr: ${Number(total24hVolume).toLocaleString()}</h5>
        </header>
    )
}