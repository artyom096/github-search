import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Repos } from '../components/Repos'
import { GithubContext } from '../context/github/githubContext'

export const Profile = ({ match }) => {

    const { getUser, getRepos, loading, user, repos } = useContext(GithubContext)
    const urlName = match.params.name

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
    }, [])

    if (loading) {
        return <p className='text-center'>Загрузка...</p>
    }

    const { login, html_url, followers, following,
        public_repos, public_gists, name,
        company, avatar_url, bio, blog, location } = user

    return (
        <>
            <Link to='/' className='btn btn-link'>На главную</Link>
            <div className='card mb-4'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-3 text-center'>
                            <img style={{width:'150px'}} src={avatar_url} alt={name} />
                            <h1>{name}</h1>
                            {location && <p>Местоположение: {location} </p>}
                        </div>
                        <div className='col'>
                            {bio && <><h3>BIO:</h3> <p>{bio}</p></>}
                            <a href={html_url} 
                            className='btn btn-dark mb-2' 
                            target='_blank'>Открыть профиль</a>
                            <ul>
                                {login && <li><strong>Username: </strong>{login}</li>}
                                {company && <li><strong>Company: </strong>{company}</li>}
                                {blog && <li><strong>Website: </strong>{blog}</li>}
                            </ul>
                            <div className='badge badge-primary mr-2'>Подписчики: {followers}</div>
                            <div className='badge badge-success mr-2'>Подписан: {following}</div>
                            <div className='badge badge-info mr-2'>Репозитории: {public_repos}</div>
                            <div className='badge badge-dark mr-2'>Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos={repos} />
        </>
    )
}