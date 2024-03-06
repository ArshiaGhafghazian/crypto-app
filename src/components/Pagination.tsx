import styles from "./Pagination.module.css"

type PaginationProps = {
    pageNumber: number
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ pageNumber, setPageNumber }: PaginationProps) => {
    console.log(pageNumber);

    return (
        <div className={styles.container}>
            <button onClick={() => {
                
                setPageNumber(prev => prev - 1)
            }} className={styles.button}>Previous</button>
            <span>{pageNumber}</span>
            <button onClick={() => {
                setPageNumber(prev => prev + 1)
            }} className={styles.button}>next</button>
        </div>
    )
}

export default Pagination
