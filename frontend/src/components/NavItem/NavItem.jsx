import Nav from 'react-bootstrap/Nav';

import { Link as RouterNavLink } from 'react-router-dom';

export const NavItem = ({ name, link }) => {
  return (
    <Nav.Link href=''>
      <RouterNavLink to={link}>
        {name}
      </RouterNavLink>
    </Nav.Link>
  )
}
