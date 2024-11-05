import React from 'react';

interface NavItemProps {
    link: string;
    linkText?: string;
    iconString?: string; 
    svgString?: string;
    useSvg?: boolean;
    id: string;
    subClass?: string;
    newPage?: boolean;
    title?: string;
}

const NavItem: React.FC<NavItemProps> = ({
    link, linkText, iconString, svgString, useSvg, id, subClass, newPage, title
}) => (
    <div>
        <a
            id={id}
            className={`nav-item ${subClass}`}
            href={link}
            rel="noopener noreferrer"
            target={newPage ? "_blank" : "_self"}
            title={title || ''}
        >
            {useSvg && svgString ? (
                <span dangerouslySetInnerHTML={{ __html: svgString }} />
            ) : (
                <i className={`bi bi-${iconString}`} style={{ fontSize: '18px' }}></i>
            )}
            {linkText || null}
        </a>
    </div>
);

export default NavItem;
