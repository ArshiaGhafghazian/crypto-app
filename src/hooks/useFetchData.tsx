import { useEffect, useReducer } from 'react'
import CoinsData from '../types/CoinsData.type'
import api from '../services/config'

const API_KEY = "x_cg_demo_api_key=CG-ZyWD5vW2foiYE8WTsw4zHCqz"

type InitialStateType = {
    data: CoinsData[],
    isLoading: boolean,
    error: string
}

type ActionType = {
    type: string,
    payload: CoinsData[]
}



const initialState: InitialStateType = {
    data: [],
    isLoading: true,
    error: ""
}

const reducer = (state: InitialStateType, action: ActionType) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true }
        case "SUCCESS":
            return { isLoading: false, data: action.payload, error: "" }
        case "ERROR":
            return { isLoading: false, data: action.payload, error: "error eccured!" }
        default:
            return state;

    }
}

export const useFetchData = (page: number, currency: "usd" | "eur") => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { data, isLoading, error } = state

    const getCoinsData = async () => {
        dispatch({ type: "LOADING", payload: [] })
        try {
            const response = await api.get(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page.toString()}&${API_KEY}`)
            dispatch({ type: "SUCCESS", payload: response.data })
        } catch (error) {
            dispatch({ type: "ERROR", payload: [] })
        }

    }

    useEffect(() => {
        getCoinsData()
    }, [page,currency])
    return { data, isLoading, error }
}
