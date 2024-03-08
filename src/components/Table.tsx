import { CurrencyType } from "../pages/HomePage"
import CoinsData from "../types/CoinsData.type"
import styles from "./Table.module.css"
import IconViewer from "../assets/icons/IconViewer"


type TableProps = {
    coins: CoinsData[]
    currency: CurrencyType
    setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>
    error: string
}

const Table = ({ coins, currency, setCurrency, error }: TableProps) => {

    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value as CurrencyType)
    }


    return (
        <>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price
                                <select value={currency} onChange={changeHandler}>
                                    <option value="usd">$</option>
                                    <option value="eur">€</option>
                                </select>
                            </th>
                            <th>24H</th>
                            <th>Total Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && <p className={styles.error}>{error}</p>}
                        {coins.length && coins.map(coin => (
                            <tr key={coin.id}>
                                <td onClick={() => alert(coin.id)}>
                                    <IconViewer />
                                </td>
                                <td>
                                    <div className={styles.symbolContainer}>
                                        <img src={coin.image} alt={coin.name} width={20} />
                                        <p>{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </td>
                                <td>{coin.name}</td>
                                <td>{currency == "usd" ? "$" : "€"} {coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}</td>
                                <td >
                                    <span className={`${styles.priceChange} ${coin.price_change_percentage_24h > 0 ? styles.increase : styles.decrease}`}>% {coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "N/A"}</span>
                                </td>
                                <td>{currency == "usd" ? "$" : "€"} {coin.total_volume ? coin.total_volume.toLocaleString() : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </>
    )
}


export default Table

