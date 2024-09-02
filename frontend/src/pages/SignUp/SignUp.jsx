import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export const SignUp = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Имя</Form.Label>
        <Col xs={5}>
          <Form.Control type="text" placeholder="Введите имя" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Фамилия</Form.Label>
        <Col xs={5}>
          <Form.Control type="text" placeholder="Введите фамилию" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Придумайте логин</Form.Label>
        <Col xs={5}>
          <Form.Control type="text" placeholder="Введите логин" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Ваш email</Form.Label>
        <Col xs={5}>
          <Form.Control type="email" placeholder="Введите email" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Придумайте пароль</Form.Label>
        <Col xs={5}>
          <Form.Control type="password" placeholder="Введите пароль" />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
