import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { rememberUser } from '../../features/user/userSlice'

import Cookies from "universal-cookie";

import { API_URL_USERS_LOGIN, API_URL_USERS_SESSION } from '../../constants'
// import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col"

export const SignIn = () => {
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cookies = new Cookies();

  const getSession = () => {
    fetch(API_URL_USERS_SESSION, {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getSession()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget

    let isValid = true
    if (form.checkValidity() === false) {
      isValid = false
    }

    setValidated(true);

    if (isValid) {
      const username = form[0].value
      const password = form[1].value

      const data = {
        username: username,
        password: password,
      }
      // axios
      //   .post(API_URL_USERS_LOGIN, data, {
      //     'Content-Type': 'application/json',
      //     "X-CSRFToken": cookies.get("csrftoken"),
      //   })
      fetch(API_URL_USERS_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get('csrftoken'),
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            const user = data.user
            dispatch(rememberUser(user))

            navigate('/storage')
          }
        })
        .catch(err => {
          const data = err.response.data

          setMessage(data.message)
          form[0].value = ''
          form[1].value = ''
        })
    }
  }

  return (
    <div className="sign-in">
      <h1 className='sign-in__title'>Вход</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" as={Col} md="3" controlId='formSignInUsername'>
          <Form.Label>Ваш логин</Form.Label>
          <Form.Control
            type='text'
            placeholder='Введите логин'
            required
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите логин.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" as={Col} md="3" controlId='formSignInPassword'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите пароль'
            required
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите пароль.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Text>{message}</Form.Text>
        {message !== '' ? (
          <>
            <br />
            <Button variant="primary" type="submit" className='mt-3'>
              Войти
            </Button>
          </>
        ) : (
          <Button variant="primary" type="submit">
            Войти
          </Button>
        )}
      </Form>
    </div>
  )
}
