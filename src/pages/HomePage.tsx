
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData"
import Table from "../components/Table";
import Pagination from "../components/Pagination";

export type CurrencyType = "usd" | "eur"


const HomePage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [currency, setCurrency] = useState<CurrencyType>("usd")

    const { data, isLoading } = useFetchData(pageNumber, currency)
    



    return (
        <>
            <h1>Crypto App</h1>
            <Table coins={data} currency={currency} isLoading={isLoading} />
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    )
}

export default HomePage