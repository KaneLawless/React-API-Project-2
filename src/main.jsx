import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerLicense } from '@syncfusion/ej2-base'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CoinList from './CoinList.jsx';
import SingleCoin from './SingleCoin.jsx';

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
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
