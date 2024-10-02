import React from 'react';
import '../Home/Navbar.css';

const Navbar = () => {
    return (
        <nav>

            <div className="top-nav">
                <div className="top-nav-left">
                    <ul>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">Privacy</a></li>
                        <li><a href="/">FAQ</a></li>
                        <li><a href="/">Careers</a></li>
                    </ul>
                </div>

                <div className="top-nav-right">
                    <ul>
                        <li><a href="/">Track Order</a></li>
                        <li><a href="/">Watchlist</a></li>
                        <li><a href="/"><i className="fa-brands fa-facebook"></i></a></li>
                        <li><a href="/"><i className="fa-brands fa-square-instagram"></i></a></li>
                        <li><a href="/"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="/"><i className="fa-brands fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>


            <div className="middle-nav">
                <div className="logo">
                    <h1>Shop<span>Note</span></h1>
                </div>
                <div className="mid-nav-center">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Men</a></li>
                        <li><a href="/">Women</a></li>
                        <li><a href="/">Baby Collection</a></li>
                        <li><a href="/">Pages</a></li>
                        <li><a href="/">Blog</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>
                <div className="mid-nav-right">
                    <ul>
                        <li><a href="/"><i className="fa-solid fa-magnifying-glass"></i></a></li>
                        <li><a href="/"><i className="fa-solid fa-user"></i></a></li>
                        <li><a href="/"><i className="fa-solid fa-cart-shopping"></i></a></li>
                    </ul>
                </div>
            </div>


            <div className="bottom-nav">
                <p>Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer<a href="/"> Shop Now</a></p>
            </div>
        </nav>
    )
}
export default Navbar;
