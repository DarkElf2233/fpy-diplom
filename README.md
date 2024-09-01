# Дипломный проект по профессии «Fullstack-разработчик на Python»

## Облачное хранилище My Cloud

### ШАГ 1: Backend
Чтобы запустить backend сервер перейдите в папку **backend** и создайте виртуальное окружение:
```
py -m venv .env
```

И активируйте её
```
cd .\.env\Scripts\

.\activate
```

Затем установите необходимые модули:
```
pip install -r requirements.txt
```

После этого перейдите в папку **my_cloud** запустите сервер:
```
py manage.py runserver
```

Если вы захотите воспользоваться админ панелью нужно  создать суперпользователя:
```
python manage.py createsuperuser
```

### ШАГ 2: Frontend
Чтобы запустить frontend сервер перейдите в папку **frontend** и запустите слудующие комманды:
```
npm install

npm start
```