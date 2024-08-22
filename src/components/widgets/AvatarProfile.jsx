import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function AvatarProfile() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function onClickLogout() {
        logout()
        navigate('/login')
    }

    return (
        <details className="dropdown dropdown-end">
            <summary className="btn btn-circle avatar">
                <div className="ring-primary ring-offset-base-100 size-10 rounded-full ring ring-offset-2">
                    <img src="https://avatar.iran.liara.run/public/job/police/female" alt="Profile Avatar" />
                </div>
            </summary>

            <ul className="menu dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 z-20 mt-2 text-primary font-semibold">
                <Link to={'/'}><li><div>Profile</div></li></Link>
                <Link to={'/'}><li><div>Settings</div></li></Link>
                <li><button onClick={() => onClickLogout()}>Logout</button></li>
            </ul>
        </details>
    )
}

