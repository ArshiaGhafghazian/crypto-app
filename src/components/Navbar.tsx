import styles from "./Navbar.module.css"
import SearchBar from "./SearchBar"

const Navbar = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.navbar}>
                <h1>Crypto App</h1>
                <SearchBar />
            </div>
        </nav>
    )
}

export default Navbar
