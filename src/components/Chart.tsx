import styles from "./Chart.module.css"
import IconClose from "../assets/icons/IconClose"
import ChartData from "../types/ChatsData.type"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';
import Spinner from "./Spinner";
import { useState } from "react";


type ChartProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    chartData: ChartData | undefined
    loading: boolean
    graphError: string

}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: any }>;
    label?: string;
}

const Chart = ({ setIsOpen, chartData, loading, graphError }: ChartProps) => {

    const [chartDataCount, setChartDataCount] = useState<7 | 14 | 21>(7)
    let data = chartData?.prices?.slice((-chartDataCount - 1), -1).map(price => {
        return {
            time: (() => {
                const date = new Date(price[0]);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
            })(),
            price: price[1]
        }
    })

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.icon} onClick={closeModal}>
                    <IconClose />
                </div>
                <h1>Price Graph</h1>
                <div className={styles.buttonsContainer}>
                    <button className={chartDataCount === 7 ? styles.activeButton : ''} onClick={() => setChartDataCount(7)}>Last 7 days</button>
                    <button className={chartDataCount === 14 ? styles.activeButton : ''} onClick={() => setChartDataCount(14)}>Last 14 days</button>
                    <button className={chartDataCount === 21 ? styles.activeButton : ''} onClick={() => setChartDataCount(21)}>Last 21 days</button>
                </div>
                <div className={styles.innerContainer}>
                    {!loading && graphError && <h1>Error</h1>}
                    {loading && !graphError ? <Spinner /> : <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="6 6" stroke="white" />
                        <XAxis dataKey="time" domain={["auto"]} stroke="white" tickMargin={10} />
                        <YAxis dataKey="price" stroke="white" domain={["auto"]} tickMargin={10} />
                        <Tooltip content={<CustomTooltip />} />

                        <Line type="monotone" dataKey="price" stroke="var(--color-tirnary)" strokeWidth={4} />
                    </LineChart>}
                    
                </div>
            </div>
        </div>
    )
}

export default Chart


const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0];
        return (
            <div className={styles.customTooltip}>
                <p>{`Date: ${label}`}</p>
                <p>{`Price: ${dataPoint.value}`}</p>
            </div>
        );
    }

    return null;
};