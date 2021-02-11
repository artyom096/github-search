import axios from 'axios'
import React, { useReducer } from 'react'
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types'
import { GithubContext } from './githubContext'
import { githubReducer } from './githubReducer'

export const GithubState = ({children}) => {

    const initialState = {
        loading: false,
        user: {},
        users: [],
        repos: []
    }

    const withCreds = url => {
        return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const setLoading = () => dispatch({type: SET_LOADING})

    const getUser = async name => {
        setLoading()
        const response = await axios.get(withCreds(`https://api.github.com/users/${name}?`))

        dispatch({
            type: GET_USER,
            payload: response.data
        })
    }

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const CLIENT_SECRET = process.env.REACT_APP_SECRET

    const search = async value => {
        setLoading()
        const response = await axios.get(withCreds(`https://api.github.com/search/users?q=${value}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`))
        
        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })
    }

    const getRepos = async name => {
        setLoading()
        const response = await axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`))

        dispatch({
            type: GET_REPOS,
            payload: response.data
        })
    }

    const clearUsers = () => dispatch({type: CLEAR_USERS})

    const { user, users, loading, repos } = state

    return (
        <GithubContext.Provider value={{
            search, getRepos, getUser, clearUsers, setLoading,
            user, users, loading, repos
        }}>
            {children}
        </GithubContext.Provider>
    )
}