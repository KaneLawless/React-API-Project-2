export default function StatsBar({ stats }) {
    let { total, totalExchanges, totalMarketCap, total24hVolume } = stats

    return (
        <header className="d-flex justify-content-evenly">
            <h4>Coins: {Number(total).toLocaleString()}</h4>
            <h4>Exchanges: {totalExchanges}</h4>
            <h4>Market Cap: ${Number(totalMarketCap).toLocaleString()}</h4>
            <h4>Volume 24hr: ${Number(total24hVolume).toLocaleString()}</h4>
        </header>
    )
}