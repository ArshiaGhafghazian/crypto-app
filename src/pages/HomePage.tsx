
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData"
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import IconRefresh from "../assets/icons/IconRefresh";

import styles from "./HomePage.module.css"

export type CurrencyType = "usd" | "eur"


const HomePage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [currency, setCurrency] = useState<CurrencyType>("usd")
    const [id, setId] = useState<string>("")

    const { data, isLoading, error } = useFetchData(pageNumber, currency, id)

    return (
        <>
            {isLoading && <Spinner />}

            <Navbar setId={setId} />
            <div className={styles.refresh}>
                <div onClick={() => setId("")} style={{ display: "inline", cursor: "pointer" }}>
                    <IconRefresh />
                </div>
            </div>

            <Table coins={data} currency={currency} setCurrency={setCurrency} error={error} />
            <Pagination coins={data} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    )
}

export default HomePage