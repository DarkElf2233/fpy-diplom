import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as NavbarBootstrap } from 'react-bootstrap';

import { NavItem } from '../NavItem'

export const Navbar = () => {
  const navbarItems = [
    {name: 'Home', link: '/'},
    {name: 'Sign In', link: '/signin'},
    {name: 'Sign Up', link: '/signup'},
    {name: 'Storage', link: '/storage'},
  ]

  return (
    <NavbarBootstrap fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBootstrap.Brand href="/">My Cloud</NavbarBootstrap.Brand>
        <Nav className="md-right">
          {navbarItems.map((item) => (
            <NavItem name={item.name} link={item.link} />
          ))}
        </Nav>
      </Container>
    </NavbarBootstrap>
  )
}
