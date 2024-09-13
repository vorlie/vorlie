import React from 'react';
import '../../styles/Navbar.css';

interface NavItemProps {
    link: string;
    linkText?: string;
    iconString: string;
    id: string;
    subClass?: string;
    newPage?: boolean;
    title?: string;
}

const NavItem: React.FC<NavItemProps> = ({ link, linkText, iconString, id, subClass, newPage, title }) => (
    <div>
        <a 
            id={id} 
            className={`nav-item ${subClass}`} 
            href={link} 
            rel="noopener noreferrer"
            target={newPage ? "_blank" : "_self"}
            title={title ? title : ''}
        >
            <i className={`bi bi-${iconString}`} style={{ fontSize: '18px' }} ></i>
            {linkText ? linkText : null }
        </a>
    </div>
);

export default NavItem;
