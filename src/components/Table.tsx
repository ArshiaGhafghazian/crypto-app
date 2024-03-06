import { CurrencyType } from "../pages/HomePage"
import CoinsData from "../types/CoinsData.type"

import styles from "./Table.module.css"

type TableProps = {
    coins: CoinsData[]
    currency: CurrencyType
    isLoading: boolean

}


const Table = ({ coins, currency, isLoading }: TableProps) => {

    console.log(isLoading);




    return (
        <>

            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price <span>({currency})</span></th>
                            <th>24H</th>
                            <th>Total Volume</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coins.map(coin => (
                            <tr key={coin.id}>
                                <td>
                                    <div className={styles.symbolContainer}>
                                        <img src={coin.image} alt={coin.name} width={20} />
                                        <p>{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </td>
                                <td>{coin.name}</td>
                                <td>$ {coin.current_price.toLocaleString()}</td>
                                <td >
                                    <span className={`${styles.priceChange} ${coin.price_change_percentage_24h > 0 ? styles.increase : styles.decrease}`}>% {coin.price_change_percentage_24h.toFixed(2)}</span>
                                </td>
                                <td>$ {coin.total_volume.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </>
    )
}


export default Table