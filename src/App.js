import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    // Link
} from 'react-router-dom'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import UserCreate from './components/UserCreate'
import LoginPage from './components/LoginPage'
import UserTable from './components/UserTable'
import DynamicLoginPage from './Pages/DynamicLoginPage'
import RootPanel from './Pages/RootPanel'
import AdminPanel from './Pages/AdminPanel'
import CreateAdmin from './Pages/CreateAdmin'

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route path="/">
                    <Route index element={<UserCreate />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="users" element={<UserTable />} />
                </Route>
                <Route path="/dynamic">
                    <Route index element={<DynamicLoginPage />} />
                    <Route path="root-panel" element={<RootPanel />} />
                    <Route path="admin-panel" element={<AdminPanel />} />
                    <Route path="create-admin" element={<CreateAdmin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
