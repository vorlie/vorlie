import React, { useState, useEffect } from 'react';

const CustomContextMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setIsVisible(true);
  };

  const handleClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="context-menu" style={{ top: menuPosition.y, left: menuPosition.x }}>
          <ul className="context-menu__list">
            <li className="context-menu__item">
              <a href="https://vorlie.vercel.app/?link=ohalink" className="context-menu__link">Oh a link?</a>
            </li>
            <hr className="context-menu__hr"></hr>
            <li className="context-menu__item">
              <a href="https://vorlie.vercel.app/?link=site_source" className="context-menu__link">Source Code</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CustomContextMenu;
