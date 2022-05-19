import React, { createContext, useEffect, useReducer } from "react";
import { Data } from "../interfaces";
import { countryReducer, CountryState } from './CountryReducer';
import { useQuery } from '@apollo/client';
import GET_DATA from '../graphql/queries'

type CountryContextProps = {
    data: Data | null;
    groupBy: 'continent' | 'language';
}

const countryInitialState: CountryState = {
    data: null,
    groupBy: 'continent',
}

export const CountryContext = createContext({} as CountryContextProps)

export const CountryProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(countryReducer, countryInitialState)
    const { error, loading, data } = useQuery(GET_DATA)

    useEffect(() => {
        if (data) {
            setData();
        }
    }, [data])

    const setData = () => {
        dispatch({
            type: 'setData',
            payload: {
                data: data
            }
        })
    }

    return (
        <CountryContext.Provider value={{
            ...state,
        }}>
            {children}
        </CountryContext.Provider>
    )
}