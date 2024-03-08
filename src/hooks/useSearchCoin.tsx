import { useEffect, useReducer, useState } from "react"
import SearchCoinsData from "../types/SearchCoinsData.type"
import api from "../services/config"

const API_KEY = "x_cg_demo_api_key=CG-ZyWD5vW2foiYE8WTsw4zHCqz"
type InitialStateType = {
    data: SearchCoinsData[],
    isLoading: boolean,
    error: string
}

type ActionType = {
    type: string,
    payload: SearchCoinsData[]
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
        case "CANCEL":
            return { isLoading: false, data: action.payload, error: "" }
        case "ERROR":
            return { isLoading: false, data: action.payload, error: "error eccured!" }
        default:
            return state;

    }
}

const useSearchCoin = (query: string) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { data, isLoading, error } = state

    const searchHandler = async () => {
        dispatch({ type: "LOADING", payload: [] })
        try {
            const response = await api.get(`search?query=${query}&${API_KEY}`)
            dispatch({ type: "SUCCESS", payload: response.data.coins })
        } catch (error) {
            dispatch({ type: "ERROR", payload: [] })
        }

    }


    useEffect(() => {
        if (!query) {
            dispatch({ type: "CANCEL", payload: [] })
            return
        }


        const timeOut = setTimeout(() => {
            searchHandler()

        }, 1000)

        return () => clearTimeout(timeOut)
    }, [query])



    return { data, isLoading, error }
}


export default useSearchCoin