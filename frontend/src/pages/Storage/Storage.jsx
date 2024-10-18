import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rememberUser } from "../../features/user/userSlice";

import { API_URL } from "../../constants";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

import { StorageItem } from "../../components/StorageItem";
import { NoPermission } from "../../components/NoPermission";

export const Storage = () => {
  const user = useSelector((state) => state.user.value);
  const [isCsrf, setIsCsrf] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getFiles = (userId) => {
    axios(API_URL + `storage/?pk=${userId}`, {
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        setFiles(res.data);
      }
    });
  };

  const userInfo = () => {
    axios(API_URL + "user_info/", { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        getFiles(res.data.id);
        dispatch(rememberUser(res.data));
      }
    });
  };

  const getCsrf = () => {
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
    axios(API_URL + "session/", { withCredentials: true }).then((res) => {
      if (res.data.isAuthenticated) {
        userInfo();
        getCsrf();
        setIsAuthenticated(true);
      }
    });
  };

  useEffect(() => {
    getSession();
    // eslint-disable-next-line
  }, []);

  if (!isAuthenticated) {
    return <NoPermission />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const image = form[0].files[0];
    const comment = form[1].value;

    if (!image) {
      setMessage("Пожалуйста выберите файл.");
      return;
    } else if (image.size === 0) {
      form[0].value = null;
      setMessage("Нельзя загрузить пустой файл.");
      return;
    }
    let formData = new FormData();
    formData.append("file", image, image.name);
    formData.append("title", image.name);
    formData.append("size", image.size);
    formData.append("comment", comment);
    formData.append("user", user.payload.id);
    axios
      .post(API_URL + "storage/", formData, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
          "X-CSRFToken": isCsrf,
        },
        maxBodyLength: 104857600,
        maxContentLength: 104857600,
      })
      .then(() => {
        form[0].value = null;
        form[1].value = "";
        setMessage("");
        getFiles(user.payload.id);
      })
      .catch((err) => console.error(err));
  };

  if (user === null) {
    return <></>
  } else {
    return (
      <div className="storage">
        <h1 className="storage__title">Ваше Хранилище</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" className="" controlId="formStorageFile">
            <Form.Label>Добавить новый файл</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group
            className="mt-3"
            as={Col}
            md="4"
            controlId="formStorageComment"
          >
            <Form.Label>Комментарий (опциональный)</Form.Label>
            <Form.Control type="text" as="textarea" rows={3} />
          </Form.Group>

          {message ? (
            <Form.Text className="d-block mt-3">{message}</Form.Text>
          ) : (
            <Form.Text>{message}</Form.Text>
          )}

          <Button type="submit" className="mt-3 mb-4">
            Добавить
          </Button>
        </Form>

        {!files || files.length <= 0 ? (
          <p>Упс, вы ещё не загрузили ни одного файла.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Размер</th>
                <th>Дата загрузки</th>
                <th>Дата последнего скачивания</th>
                <th>Комментарий</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <StorageItem
                  key={file.id}
                  file={file}
                  userId={user.payload.id}
                  getFiles={getFiles}
                  isCsrf={isCsrf}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
};
