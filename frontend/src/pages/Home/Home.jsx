import React, { Component } from 'react'
import '../../App.css'

import Button from 'react-bootstrap/Button'

export class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1 className='home__title'>My Cloud - облачное хранилище</h1>
        <p className='home__info'>Чтобы продолжить создайте аккаунт или войдите в существующий.</p>
        <a href="/signin"><Button className='' variant='outline-secondary'>Войти</Button></a>
        <a href="/signup"><Button className='ms-3' variant='secondary'>Зарегистрироваться</Button></a>
      </div>
    )
  }
}
