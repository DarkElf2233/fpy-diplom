import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rememberUser } from "../../features/user/userSlice";

import axios from "axios";
import { API_URL } from "../../constants";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export const SignIn = () => {
  const [isCsrf, setIsCsrf] = useState(null);
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateUser = () => {
    axios(API_URL + "user_info/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const user = {
            id: res.data.id,
            username: res.data.username,
          };
          dispatch(rememberUser(user));
          navigate("/storage");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCSRF = () => {
    axios
      .get(API_URL + "csrf/", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          const csrfToken = res.headers.get("X-CSRFToken");
          setIsCsrf(csrfToken);
        }
      })
      .catch((err) => console.error(err));
  };

  const getSession = () => {
    axios(API_URL + "session/", { withCredentials: true })
      .then((res) => {
        if (res.data.isAuthenticated) {
          navigateUser();
        } else {
          getCSRF();
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
      const username = form[0].value;
      const password = form[1].value;

      const data = {
        username: username,
        password: password,
      };
      axios
        .post(API_URL + "login/", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": isCsrf,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            navigateUser();
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            const data = err.response.data;
            setMessage(data.message);
            form[0].value = "";
            form[1].value = "";
          } else {
            console.error(err);
          }
        });
    }
  };

  return (
    <div className="sign-in">
      <h1 className="sign-in__title">Вход</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          as={Col}
          md="3"
          controlId="formSignInUsername"
        >
          <Form.Label>Ваш логин</Form.Label>
          <Form.Control type="text" placeholder="Введите логин" required />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите логин.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          className="mb-3"
          as={Col}
          md="3"
          controlId="formSignInPassword"
        >
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" required />
          <Form.Control.Feedback type="invalid">
            Пожалуйта введите пароль.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Text>{message}</Form.Text>
        {message !== "" ? (
          <>
            <br />
            <Button variant="primary" type="submit" className="mt-3">
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
  );
};
