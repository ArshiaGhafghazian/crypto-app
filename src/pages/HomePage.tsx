
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData"
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

export type CurrencyType = "usd" | "eur"


const HomePage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [currency, setCurrency] = useState<CurrencyType>("usd")

    const { data, isLoading } = useFetchData(pageNumber, currency)

    console.log(setCurrency);



    return (
        <>
            {isLoading && <Spinner />}
            <h1 style={{ marginBottom: "30px" }}>Crypto App</h1>
            <Table coins={data} currency={currency} setCurrency={setCurrency} />
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    )
}

export default HomePage