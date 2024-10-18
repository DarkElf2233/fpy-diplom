from dotenv import load_dotenv
from pathlib import Path
import os
import json

load_dotenv()    

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'passlib.ext.django',
    'storage',
    'rest_framework',
    'corsheaders',

]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAdminUser',
    ]
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'my_cloud.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'my_cloud.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME"),
        'USER': os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PASS"),
        'HOST': os.getenv("DB_HOST"),
        'PORT': os.getenv("DB_PORT")
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Security

CSRF_TRUSTED_ORIGINS = json.loads(os.getenv('CSRF_TRUSTED_ORIGINS'))

CSRF_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SAMESITE = 'Lax'

# Note: for DEV set to False and True, for PROD set True and True
CSRF_COOKIE_HTTPONLY = os.getenv('CSRF_COOKIE_HTTPONLY')
SESSION_COOKIE_HTTPONLY = os.getenv('SESSION_COOKIE_HTTPONLY')

CORS_ALLOWED_ORIGINS = json.loads(os.getenv('CORS_ALLOWED_ORIGINS'))

CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']

CORS_ALLOW_CREDENTIALS = True

# Internationalization
LANGUAGE_CODE = 'Ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_ROOT = os.path.join(BASE_DIR, os.getenv('STATIC_URL'))

STATIC_URL = os.getenv('STATIC_URL')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Media files
MEDIA_ROOT = os.path.join(BASE_DIR, os.getenv('MEDIA_URL'))

MEDIA_URL = os.getenv('MEDIA_URL')

FILE_UPLOAD_MAX_MEMORY_SIZE = 104_857_600

# User Model
AUTH_USER_MODEL = 'storage.Users'
