import React from 'react'

export const Repos = ({ repos }) => {
    return (
        <>
            {repos.map((repos, index) => {
                return (
                    <div key={repos.name + index} className='card mb-3'>
                        <div className='card-body'>
                            <h5>
                                <a
                                    href={repos.html_url}
                                    target='_blank'
                                >
                                    {repos.name}
                                </a>
                            </h5>
                        </div>
                    </div>
                )
            })}
        </>
    )
}