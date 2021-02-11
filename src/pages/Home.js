import React, { useContext } from 'react'
import { Card } from '../components/Card'
import { Search } from '../components/Search'
import { GithubContext } from '../context/github/githubContext'

export const Home = () => {

    const { users, loading } = useContext(GithubContext)

    return (
        <>
            <Search />
            {loading
                ? <p>Загрузка...</p>
                : <div className='row'>
                    {users.map((user, index) => {
                        return (
                            <div key={index + user.id} className='col-sm-3 mt-4'>
                                <Card user={user} />
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}