import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/images/clapperboard.png';

export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">
                            <img
                                alt=""
                                src= {logo}
                                width="30"
                                height="30"
                            />
                            Watchlist
                        </Link>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <Link to="/">Watch List</Link>
                        </li>

                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>

                        <li>
                            <Link to="/add" className="btn">
                                +Add
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </header>
    )
}
