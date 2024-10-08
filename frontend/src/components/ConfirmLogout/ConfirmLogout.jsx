import { useNavigate } from "react-router-dom";
import { API_URL_USERS_LOGOUT } from '../../constants'
import { useDispatch } from 'react-redux'
import { forgetUser } from '../../features/user/userSlice'

import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ConfirmLogout = ({ show, handleClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    axios(API_URL_USERS_LOGOUT, {
      withCredentials: true
    })
      .then(data => {
        console.log(data)
      })

    dispatch(forgetUser())
    handleClose()
    navigate('/')
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Выход</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите выйти из аккаунта?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleLogout}>
          Выйти
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
