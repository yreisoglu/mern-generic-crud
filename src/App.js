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
import FormList from './components/FormList'

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
                    <Route path="form-list" element={<FormList />} />
                    <Route index element={<UserCreate />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="users" element={<UserTable />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
