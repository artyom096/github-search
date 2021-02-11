import React, { useContext, useState } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { GithubContext } from '../context/github/githubContext'

export const Search = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)

    const github = useContext(GithubContext)

    const onSubmit = event => {
        if (event.key !== 'Enter') {
            return
        }

        if (value.trim()) {
            github.search(value.trim())
            alert.hide()
            
        } 
        else {
            alert.show('Введите данные пользователя!')
            github.clearUsers()
        }
    }

    return (
        <div className='input-group'>
            <input
                value={value}
                onChange={event => setValue(event.target.value)}
                onKeyPress={onSubmit}
                placeholder='Введите ник пользователя...'
                className='form-control' />
        </div>
    )
}