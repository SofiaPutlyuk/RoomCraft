import { LoginModal } from './LoginModal';
import { useNavigate } from "react-router-dom";
import logoCraft from '../../assets/logo/logoCraft.svg'
import { FaHome } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { useState, useEffect } from 'react';
export const Header = ({ user, setUser }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const navigate = useNavigate()
    const handleLogin = (userData) => {
        setUser(userData);
        closeLogin();
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/")
    };
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);
    return (
        <>
            <header className="header-craft">
                <nav>
                    <ul>
                        <li className="item-craft">
                            <img src={logoCraft} alt="logo-craft" />
                        </li>
                        <li className="item-craft">
                            <div className="craft-menu" onClick={toggleMenu}>
                                <div className="menu"></div>
                                <div className="menu"></div>
                                <div className="menu"></div>
                            </div>
                        </li>
                        <li className="item-craft hide">
                            <a href="/" className="link"><FaHome className="icon-menu" /> Home</a>
                        </li>
                        <li className="item-craft hide">
                            <button className="link" onClick={() => {
                                const el = document.getElementById("choose-your-room");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}>
                                <MdOutlineMeetingRoom className="icon-menu" />My Rooms
                            </button>
                        </li>
                        <li className="item-craft  hide">
                            <a href="/shop" className="link"><FaShoppingCart className="icon-menu" />Shop</a>
                        </li>
                        {!user ? (
                            <>
                                <li className="item-craft  hide">
                                    <button type='button' onClick={() => navigate("/register")} className="button-sign">Ready to Begin? Sign Up</button>
                                </li>
                                <li className="item-craft  hide">
                                    <button type='button' className="button-sign" onClick={openLogin}>Log in</button>
                                </li>
                            </>
                        ) : (
                            <>
                             <li className="item-craft  hide">
                            <a href="/create-character" className="link"><MdEmojiPeople  className="icon-menu" />Character</a>
                        </li>
                                <li className="item-craft  hide user-name">
                                    Hello, {user.name}
                                </li>
                                <li className="item-craft  hide">
                                    <button type="button" className="button-sign" onClick={handleLogout}>Log out</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            {menuOpen && (
                <div className="dropdown-craft">
                    <a href="/" className="link"> <FaHome className="icon-menu" /> Home</a>
                    <hr className="craft-dash" />
                    <a href="" className="link"> <MdOutlineMeetingRoom className="icon-menu" />My Rooms</a>
                    <hr className="craft-dash" />
                    <a href="/create-character" className="link"> <MdEmojiPeople  className="icon-menu" />Character</a>
                    <hr className="craft-dash" />
                    <a href="/shop" className="link"> <FaShoppingCart className="icon-menu" />Shop</a>
                </div>
            )}
            <LoginModal isOpen={isLoginOpen} onRequestClose={closeLogin} onLogin={handleLogin} />
        </>
    )
}