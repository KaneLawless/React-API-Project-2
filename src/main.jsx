import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { registerLicense } from '@syncfusion/ej2-base'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CoinList from './components/CoinList.jsx';
import SingleCoin from './components/SingleCoin.jsx';
import Search from './components/Search.jsx';
import "./styles/main.scss";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0THxbf1x0ZF1MYF9bRHBPMyBoS35RckVnW31eeHRWRmZcWUVy')

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <CoinList />,
            },
            {
                path: '/coin/:uuid',
                element: <SingleCoin />
            },
            {
                path: '/search/:query',
                element: <Search />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
