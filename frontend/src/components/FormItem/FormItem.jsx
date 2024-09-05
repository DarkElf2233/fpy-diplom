import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"

export const FormItem = ({ label, type, placeholder, controlId }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Col xs={4}>
        <Form.Control type={type} placeholder={placeholder} />
      </Col>
    </Form.Group>
  )
}
