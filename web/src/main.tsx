import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Home.tsx';
import { Layout } from './Layout.tsx';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Tasks } from './features/tasks/Tasks.tsx';
import { Calendar } from './features/calendar/Calendar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path:"/tasks",
        element: <Tasks/>
      },
      {
        path: "/calendar",
        element: <Calendar/>
      }
    ],
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router}/> 
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
