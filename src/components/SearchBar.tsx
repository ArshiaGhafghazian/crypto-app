import styles from "./SearchBar.module.css"

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search Coins..."/>
        </div>
    )
}


export default SearchBar
