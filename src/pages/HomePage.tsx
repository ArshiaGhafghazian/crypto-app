
import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData"
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import IconRefresh from "../assets/icons/IconRefresh";
import styles from "./HomePage.module.css"
import Chart from "../components/Chart";
import api, { API_KEY } from "../services/config";
import ChartData from "../types/ChatsData.type";

export type CurrencyType = "usd" | "eur"

const HomePage = () => {

    const [pageNumber, setPageNumber] = useState<number>(1)
    const [currency, setCurrency] = useState<CurrencyType>("usd")
    const [id, setId] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data, isLoading, error } = useFetchData(pageNumber, currency, id)
    const [chartData, setChartData] = useState<ChartData>()
    const [loading, setLoading] = useState<boolean>(false)

    const getChartData = async (id: string) => {
        setLoading(true)
        try {
            const response = await api.get(`coins/${id}/market_chart?vs_currency=${currency}&days=91${API_KEY}`)
            console.log(response.data);
            setChartData(response.data)

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {isLoading && <Spinner />}
            {isOpen && <Chart setIsOpen={setIsOpen} chartData={chartData} loading={loading}/>}
            <Navbar setId={setId} />
            <div className={styles.refresh}>
                <div onClick={() => setId("")} style={{ display: "inline", cursor: "pointer" }}>
                    <IconRefresh />
                </div>
            </div>
            <Table coins={data} currency={currency} setCurrency={setCurrency} error={error} setIsOpen={setIsOpen} getChartData={getChartData} />
            <Pagination coins={data} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    )
}

export default HomePage