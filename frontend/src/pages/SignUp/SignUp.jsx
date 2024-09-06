import React, { Component } from 'react'
import { v4 } from 'uuid'
import '../../App.css'
import { API_URL_USERS } from '../../constants'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FormItem } from '../../components/FormItem';

export class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.formItems = [
      { label: 'Имя', type: 'text', placeholder: 'Введите имя', controlId: 'formBasicFirstName' },
      { label: 'Фамилия', type: 'text', placeholder: 'Введите фамилию', controlId: 'formBasicLastName' },
      { label: 'Придумайте логин', type: 'text', placeholder: 'Введите логин', controlId: 'formBasicUsername' },
      { label: 'Ваш email', type: 'email', placeholder: 'Введите email', controlId: 'formBasicEmail' },
      { label: 'Придумайте пароль', type: 'password', placeholder: 'Введите пароль', controlId: 'formBasicPassword' },
    ]
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const full_name = `${form[0].value} ${form[1].value}`
    const username = form[2].value
    const email = form[3].value
    const password = form[4].value

    try {
      const res = fetch(API_URL_USERS, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          full_name: full_name,
          username: username,
          email: email,
          password: password,
          create: true
        })
      })
    } catch (err) {
      console.log(err.name)
      console.log(err.message)
    }
  }

  render() {
    return (
      <div className="sign-up">
        <h1 className="sign-up__title">Регистрация</h1>
        <p>{this.state.message}</p>
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
            Создать
          </Button>
        </Form>
      </div>
    )
  }
}
