
import React from 'react';
import NavItem from './NavItem';
import '../../styles/Navbar.css';


const Navbar: React.FC = ({ }) => (
    <div className="navbar">
        <div className="navbar-inner-container">
            <a className="lanyard" href="https://discord.com/users/614807913302851594">
                <div className="vorlie">
                    <img id="avatar" src="" alt="User Avatar" />
                    <img id="avatar-deco" src="" alt="Avatar Decoration" />
                    <div className="userinfo"></div>
                </div>
            </a>
            <div className="nav-items">
                <NavItem id="home" link="/" linkText="Home" iconString='house-fill'/>
                <NavItem id="projects" link="/projects" linkText="Projects" iconString='code-square' />
                <NavItem id="specs" link="/pc-specs" linkText="Specs" iconString='pci-card'/>
                <NavItem id="credits" link="/credits" linkText="Credits" iconString='info-square-fill'/>
            </div>
        </div>
    </div>
);

export default Navbar;