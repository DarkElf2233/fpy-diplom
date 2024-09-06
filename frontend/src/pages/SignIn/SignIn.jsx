import React, { Component } from 'react'
import { v4 } from 'uuid';
import '../../App.css'
import { API_URL_USERS } from '../../constants'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FormItem } from '../../components/FormItem';

export class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.formItems = [
      { label: 'Ваш логин', type: 'text', placeholder: 'Введите логин', controlId: 'formBasicLogin' },
      { label: 'Пароль', type: 'password', placeholder: 'Введите пароль', controlId: 'formBasicPassword' },
    ]
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const username = form[0].value
    const password = form[1].value

    try {
      fetch(API_URL_USERS, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          create: false
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="sign-in">
        <h1 className='sign-in__title'>Вход</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.formItems.map((item) => (
            <FormItem
              key={v4()}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              controlId={item.controlId}
            />
          ))}

          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      </div>
    )
  }
}

