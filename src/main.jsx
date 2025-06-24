import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Typetest from './pages/Typetest.jsx'
import FinalScore from './pages/FinalScore.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Authverify from './components/Authverify.jsx'
import PlScore from './pages/PlScore.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '*',
        element: <ErrorPage />
      },
      {
        path: '/',
        element: <Authverify>
          <Typetest />
        </Authverify>
      },
      {
        path: '/score',
        element: <Authverify>
          <FinalScore />
        </Authverify>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/pl-scores',
        element: <Authverify>
          <PlScore />
        </Authverify>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>
  // </StrictMode>,
)
