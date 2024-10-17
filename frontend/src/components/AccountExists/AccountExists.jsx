import { Link as RouterNavLink } from 'react-router-dom';
import Button from "react-bootstrap/Button"

export const AccountExists = () => {
  return (
    <div className="error-message">
      <h1>403 - Вход запрещен</h1>
      <h3>Упс, кажется вы уже вошли в свой аккаунт!</h3>
      <RouterNavLink to='/'>
        <Button className="mt-3 me-3" variant="secondary">
          На главную
        </Button>
      </RouterNavLink>
      <RouterNavLink to='/storage'>
        <Button className="mt-3" variant="secondary">
          В хранилище
        </Button>
      </RouterNavLink>
    </div>
  )
}
