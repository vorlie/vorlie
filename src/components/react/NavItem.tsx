import React from 'react';
import '../../styles/Navbar.css';
interface NavItemProps {
    link: string;
    linkText: string;
    iconString: string;
    id: string;
}

const NavItem: React.FC<NavItemProps> = ({ link, linkText, iconString, id }) => (
    <div>
        <a id={id} className="nav-item" href={link} rel="noopener noreferrer">
            <i className={`bi bi-${iconString}`} style={{ fontSize: '18px' }} ></i>
            {linkText}
        </a>
    </div>

);

export default NavItem;
