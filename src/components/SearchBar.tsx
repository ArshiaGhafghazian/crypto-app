import { useEffect, useRef, useState } from "react"
import styles from "./SearchBar.module.css"
import useSearchCoin from "../hooks/useSearchCoin"
import Spinner from "./Spinner"


type SearchBarProps = {
    setId: React.Dispatch<React.SetStateAction<string>>
}
const SearchBar = ({ setId }: SearchBarProps) => {

 
    const [value, setValue] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data, error, isLoading } = useSearchCoin(value)
    const searchBarRef = useRef<HTMLDivElement>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node))
            setIsOpen(false)
        setValue("")
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div className={styles.container} ref={searchBarRef}>
            <input type="text" placeholder="Search Coins..." value={value} onChange={changeHandler} onFocus={() => setIsOpen(true)} />
            {isOpen && <div className={styles.searchbox}>
                {isLoading && <Spinner />}

                {
                    data.length > 0 && !isLoading && data.map(coin =>
                        <div key={coin.id} className={styles.boxContainer} onClick={() => {
                            setId(coin.id)
                            setIsOpen(false)
                            setValue("")

                        }}>
                            <img src={coin.thumb} alt={coin.name} width={20} />
                            <p>{coin.name}</p>
                        </div>
                    )
                }
                {!data.length && !isLoading && !error && <div className={styles.warning}><p>no result</p></div>}
                {error && <div className={styles.error}><p>{error}</p></div>}
            </div>}

        </div>
    )
}


export default SearchBar
