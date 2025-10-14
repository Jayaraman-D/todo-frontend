
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Signup from './Authentication/signup/Signup.jsx'
import Login from './Authentication/login/Login.jsx'
import Setting from './setting/Setting.jsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx'
import CompletedTask from './completedTask/CompletedTask.jsx'
import EditTask from './editTask/EditTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/setting',
    element: (
      <ProtectedRoute>
        <Setting />
      </ProtectedRoute>
    )
  },
  {
    path: '/completed-task',
    element: (
      <ProtectedRoute>
        <CompletedTask />
      </ProtectedRoute>
    )
  },
  {
    path: '/edit-task/:id',
    element: (
      <ProtectedRoute>
        <EditTask />
      </ProtectedRoute>
    )
  }
]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
