import React, { Component } from 'react'
import { v4 } from 'uuid';
import '../../App.css'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FormItem } from '../../components/FormItem';

export class SignIn extends Component {
  constructor(props) {
    super(props)

    this.formItems = [
      { label: 'Ваш логин', type: 'text', placeholder: 'Введите логин', controlId: 'formBasicLogin' },
      { label: 'Пароль', type: 'password', placeholder: 'Введите пароль', controlId: 'formBasicPassword' },
    ]
  }

  render() {
    return (
      <div className="sign-in">
        <h1 className='sign-in__title'>Вход</h1>
        <Form>
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

