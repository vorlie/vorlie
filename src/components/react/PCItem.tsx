import React from 'react';
import '../../styles/PCItem.css';

interface ItemProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    desc: string;
    link: string;
    linkText: string;
}

const Item: React.FC<ItemProps> = ({ imgSrc, imgAlt, title, desc, link, linkText }) => (
    <div className="container-item">
        <div className="item-img">
            <img className="img" src={imgSrc} alt={imgAlt} />
        </div>
        <div className="item-details">
            <p className="item-title">{title}</p>
            <p className="item-desc">{desc}</p>
            <a className="link" href={link} target="_blank" rel="noopener noreferrer">{linkText}</a>
        </div>
    </div>
);

export default Item;
