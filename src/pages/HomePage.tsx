
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData"
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

export type CurrencyType = "usd" | "eur"


const HomePage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [currency, setCurrency] = useState<CurrencyType>("usd")

    const { data, isLoading, error } = useFetchData(pageNumber, currency)




    return (
        <>
            {isLoading && <Spinner />}

            <Navbar />

            <Table coins={data} currency={currency} setCurrency={setCurrency} error={error} />
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    )
}

export default HomePage