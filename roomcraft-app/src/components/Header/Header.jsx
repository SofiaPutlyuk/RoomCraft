import logoCraft from '../../assets/logo/logoCraft.svg'
import { FaHome } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaPalette } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(!menuOpen)
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
                            <a href="" className="link"><FaHome className="icon-menu" /> Home</a>
                        </li>
                        <li className="item-craft hide">
                            <a href="" className="link"><MdOutlineMeetingRoom className="icon-menu" />My Rooms</a>
                        </li>
                        <li className="item-craft  hide">
                            <a href="" className="link"><FaPalette className="icon-menu" />Editor</a>
                        </li>
                        <li className="item-craft  hide">
                            <a href="" className="link"><FaShoppingCart className="icon-menu" />Shop</a>
                        </li>
                        <li className="item-craft  hide">
                            <button type='button' className="button-sign">Sign up</button>
                        </li>
                    </ul>
                </nav>
            </header>
            {menuOpen && (
                <div className="dropdown-craft">
                    <a href="/" className="link"> <FaHome className="icon-menu" /> Home</a>
                    <hr className="craft-dash" />
                    <a href="" className="link"> <MdOutlineMeetingRoom className="icon-menu" />My Rooms</a>
                    <hr className="craft-dash" />
                    <a href="" className="link"> <FaPalette className="icon-menu" />Editor</a>
                    <hr className="craft-dash" />
                    <a href="" className="link"> <FaShoppingCart className="icon-menu" />Shop</a>
                </div>
            )}
        </>
    )
}