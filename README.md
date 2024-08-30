## README.md

### Project Overview
This project is a task manager built using Django for the backend and Vite React for the frontend. It allows users to create, edit, and delete tasks.
It also has a crontab for notification via mail, and authentification module.
As asked, it can filter tasks by state
### Installation and Setup

#### Backend (Django)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Orlando0309/django-task-manager.git
   ```
2. **Install requirements:**
   ```bash
   cd task-manager-api
   pip install -r requirements.txt
   ```
3. **Create database:**
   ```bash
   python manage.py migrate
   ```
   a. **Execute Script in:**
   There is some default data that needs to be saved
  ```bash
    cd script
  ```
4. **Run the Django development server:**
   ```bash
   python manage.py runserver
   ```

#### Frontend (React)
1. **Navigate to the frontend directory:**
   ```bash
   cd task-manager
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Usage
1. **Open your web browser and navigate to http://127.0.0.1:5173/.**
2. **Register or log in** to access the task manager.
3. **Create, edit, and delete tasks** as needed.

### Project Structure
```
project_name/
├── task-manager-api/
├── manage.py
├── task
│   ├── __init__.py
│   ├── migrations
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── tmapi
│   ├── __init__.py
│   ├── migrations
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── tmauth
│   ├── __init__.py
│   ├── migrations
│   │   └── ...
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── .env
├── .env.example
├── requirements.txt
├task-manager/
├── node_modules
├── public
│   └── index.html
├── src
│   ├── assets
│   │   └── ...
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── Modal.jsx
│   │   ├── NewTask.jsx
│   │   ├── TaskList.jsx
│   │   ├── ...
│   ├── pages
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── TaskListPage.jsx
│   │   ├── ...
│   ├── router
│   │   ├── AppRouter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ...
│   ├── App.jsx
│   ├── axiosConfig.jsx
│   ├── index.css
│   ├── index.js
│   ├── main.jsx
│   ├── secret.js
│   ├── utils
│   │   └── ...
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
```
