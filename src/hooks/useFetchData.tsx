import { useEffect, useReducer } from 'react'
import CoinsData from '../types/CoinsData.type'
import api, { API_KEY } from '../services/config'
import { CurrencyType } from '../pages/HomePage'



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

export const useFetchData = (page: number, currency: CurrencyType, id: string) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { data, isLoading, error } = state

    const getCoinsData = async () => {
        dispatch({ type: "LOADING", payload: [] })
        try {
            const response = await api.get(`coins/markets?vs_currency=${currency}${id && `&ids=${id}`}&order=market_cap_desc${!id && `&per_page=10&page=${page.toString()}`}&${API_KEY}`)
            dispatch({ type: "SUCCESS", payload: response.data })
        } catch (error) {
            dispatch({ type: "ERROR", payload: [] })
        }
    }

    useEffect(() => {
        getCoinsData()
    }, [page, currency, id])
    return { data, isLoading, error }
}
