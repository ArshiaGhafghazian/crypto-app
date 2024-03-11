import styles from "./Navbar.module.css"
import SearchBar from "./SearchBar"

type NavbarProps = {
    setId: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({ setId }: NavbarProps) => {

    return (
        <nav className={styles.container}>
            <div className={styles.navbar}>
                <h1>Crypto'Dorre</h1>
                <SearchBar setId={setId}/>
            </div>
        </nav>
    )
}

export default Navbar
