// src/components/react/Credits.tsx
import React from 'react';
import '../../styles/Credits.css';

const creditsData = [
    { label: 'Discord Integration', link: 'https://github.com/Phineas/lanyard?tab=readme-ov-file', name: 'Lanyard by Phineas' },
    { label: 'Website hosting', link: 'https://vercel.com/', name: 'Vercel' },
    { label: 'Framework(s)', link: 'https://astro.build/', name: 'Astro' },
    { label: 'Icons', links: [
        { link: 'https://icons8.com/icons', name: 'Icons8' },
        { link: 'https://icons.getbootstrap.com/', name: 'Bootstrap Icons' }
    ] },
    { label: 'Noise Effect', link: 'https://codepen.io/IbeVanmeenen/pen/vZzgvg', name: 'Background Noise by IbeVanmeenen' },
];

export const Credits: React.FC = () => {
    return (
        <div className="credits">
            <h1 className="header-text">Credits</h1>
            <div className="credits-container">
                
                {creditsData.map((credit, index) => (
                    <div key={index} className="credit-item">
                        {credit.label && <span className="credit-label">{credit.label}: </span>}
                        {credit.links ? (
                            credit.links.map((link, i) => (
                                <React.Fragment key={i}>
                                    <a className="credit-link" href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                    {i < credit.links.length - 1 && ', '}
                                </React.Fragment>
                            ))
                        ) : (
                            <a className="credit-link" href={credit.link} target="_blank" rel="noopener noreferrer">{credit.name}</a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Credits;