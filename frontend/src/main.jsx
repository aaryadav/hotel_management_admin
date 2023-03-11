import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import App from './App'
import Dashboard from './Dashboard'
import ErrorPage from './errorPage'
import RoomDetails from './RoomDetails'
import Edit from './Edit'
import Book from './Book'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dash",
        element: < Dashboard />,
      },
      {
        path: "/new",
        element: < Book />,
      },
    ],
  },
]);

const theme = extendTheme({
  fonts: {
    heading: 'Barlow',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  styles: {
    global: {
      a: {
        textDecoration: 'underline',
      },
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)