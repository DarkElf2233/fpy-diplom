import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rememberUser } from "../../features/user/userSlice";

import { API_URL } from "../../constants";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { AccountExists } from "../../components/AccountExists";

export const SignUp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSession = () => {
    axios(API_URL + "session/", { withCredentials: true })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSession();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    let isValid = true;
    if (form.checkValidity() === false) {
      isValid = false;
    }

    setValidated(true);

    if (isValid) {
      const firstName = form[0].value;
      const lastName = form[1].value;
      const username = form[2].value;
      const email = form[3].value;
      const password = form[4].value;

      const data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      };
      axios
        .post(API_URL + "register/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            const newUser = res.data;
            dispatch(rememberUser(newUser));
            navigate("/");
          }
        })
        .catch((err) => {
          const data = err.response.data;

          setMessage(data.message);
          if (data.input_name === "username") {
            form[2].value = "";
          }
          if (data.input_name === "password") {
            form[4].value = "";
          }
        });
    }
  };
  if (isAuthenticated) {
    return <AccountExists />;
  } else {
    return (
      <div className="sign-up">
        <h1 className="sign-up__title">Регистрация</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            as={Col}
            md="3"
            controlId="formSignUpFirstName"
          >
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Введите имя" required />
            <Form.Control.Feedback type="invalid">
              Пожалуйта введите имя.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            md="3"
            controlId="formSignUpLastName"
          >
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Фамилия" required />
            <Form.Control.Feedback type="invalid">
              Пожалуйста введите фамилию.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            md="3"
            controlId="formSignUpUsername"
          >
            <Form.Label>Придумайте логин</Form.Label>
            <Form.Control type="text" placeholder="Введите логин" required />
            <Form.Control.Feedback type="invalid">
              Пожалуйта введите логин.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            md="3"
            controlId="formSignUpEmail"
          >
            <Form.Label>Ваш email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" required />
            <Form.Control.Feedback type="invalid">
              Пожалуйта введите email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="formSignUpPassword">
            <Form.Label>Придумайте пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              required
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйта введите пароль.
            </Form.Control.Feedback>
          </Form.Group>

          {message ? (
            <Form.Text className="d-block mt-3">{message}</Form.Text>
          ) : (
            <Form.Text>{message}</Form.Text>
          )}

          <Button type="submit" className="mt-3">
            Создать
          </Button>
        </Form>
      </div>
    );
  }
};
