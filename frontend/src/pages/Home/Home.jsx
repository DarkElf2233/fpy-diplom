import { useSelector } from "react-redux";
import { Link as RouterNavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";

export const Home = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="home">
      <h1 className="home__title mb-4">My Cloud - облачное хранилище</h1>
      {user === null ? (
        <>
          <p className="home__info">
            Чтобы продолжить создайте аккаунт или войдите в существующий.
          </p>
          <RouterNavLink to="/signin">
            <Button variant="outline-secondary">Войти</Button>
          </RouterNavLink>
          <RouterNavLink to="/signup">
            <Button className="ms-4" variant="secondary">
              Зарегистрироваться
            </Button>
          </RouterNavLink>
        </>
      ) : (
        <>
          <p className="home__info">
            Новый аккаунт был успешно создан. Чтобы попасть в хранилище войдите в аккаунт.
          </p>
          <RouterNavLink to="/signin">
            <Button variant="secondary">Войти</Button>
          </RouterNavLink>
        </>
      )}
    </div>
  );
};
