import React, { useState, useEffect } from 'react';

interface CustomContextMenuProps {
  mouseHover?: boolean;
}

const CustomContextMenu: React.FC<CustomContextMenuProps> = ({mouseHover}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [linkToCopy, setLinkToCopy] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    if (target.tagName === 'A') {
      const href = (target as HTMLAnchorElement).href;
      setLinkToCopy(href);
      setImageSource(null);
    } else if (target.tagName === 'IMG') {
      const src = (target as HTMLImageElement).src;
      setImageSource(src);
      setLinkToCopy(null);
    } else {
      setLinkToCopy(null);
      setImageSource(null);
    }

    setMenuPosition({ x: e.pageX, y: e.pageY });
    setIsVisible(true);
  };

  const handleClick = () => {
    setIsVisible(false);
  };

  const handleCopyLink = async () => {
    if (linkToCopy) {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(linkToCopy);
        } else {
          // Fallback for browsers without clipboard support
          const textArea = document.createElement("textarea");
          textArea.value = linkToCopy;
          textArea.style.position = 'fixed';
          textArea.style.top = '-1000px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy link: ', error);
      }
      setIsVisible(false);
    }
  };

  const handleViewImage = () => {
    if (imageSource) {
      window.open(imageSource, '_blank');
      setIsVisible(false);
    }
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
              <a href="https://vorlie.pl/?link=ohalink" className="context-menu__link">Oh a link?</a>
            </li>
            <hr className="context-menu__hr"></hr>
            <li className="context-menu__item">
              <a href="https://vorlie.pl/?link=site_source" className="context-menu__link">Source Code</a>
            </li>
            {linkToCopy && <hr className="context-menu__hr"></hr>}
            {linkToCopy && (
              <li 
                className="context-menu__item" 
                onClick={handleCopyLink}
                style={{ cursor: mouseHover ? 'pointer' : 'default' }}
              >
                <span className="context-menu__link">Copy Link</span>
              </li>
            )}
            {imageSource && <hr className="context-menu__hr"></hr>}
            {imageSource && (
              <li 
                className="context-menu__item" 
                onClick={handleViewImage}
                style={{ cursor: mouseHover ? 'pointer' : 'default' }}
              >
                <span className="context-menu__link">View Image</span>
              </li>
            )}
          </ul>
        </div>
      )}
      {copied && <div className="copy-notification">Link copied to clipboard!</div>}
    </>
  );
};

export default CustomContextMenu;
