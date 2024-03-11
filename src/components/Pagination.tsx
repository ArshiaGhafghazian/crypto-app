import CoinsData from "../types/CoinsData.type"
import styles from "./Pagination.module.css"

type PaginationProps = {
    coins: CoinsData[]
    pageNumber: number
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ coins, pageNumber, setPageNumber, }: PaginationProps) => {


    const firstPageHandler = () => {
        if (pageNumber <= 1) return
        setPageNumber(1)
    }
    const lastPageHandler = () => {
        if (pageNumber >= 30) return
        setPageNumber(30)
    }

    const nextPageHandler = () => {
        if (pageNumber >= 30) return
        setPageNumber(prev => prev + 1)
    }
    const previousPageHandler = () => {
        if (pageNumber <= 1) return
        setPageNumber(prev => prev - 1)
    }

    return (

        <div className={styles.container}>

            <button onClick={firstPageHandler} className={styles.button} disabled={pageNumber == 1 || coins.length < 8}>First</button>
            <button onClick={previousPageHandler} className={styles.button} disabled={pageNumber == 1 || coins.length < 8}>Previous</button>
            <span>{pageNumber}</span>
            <button onClick={nextPageHandler} className={styles.button} disabled={pageNumber == 30 || coins.length < 8}>next</button>
            <button onClick={lastPageHandler} className={styles.button} disabled={pageNumber == 30 || coins.length < 8}> Last</button >
        </div >

    )
}

export default Pagination
