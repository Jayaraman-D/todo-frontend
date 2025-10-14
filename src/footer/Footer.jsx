import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { name: 'All', path: '/' },
    { name: 'Completed', path: '/completed-task' }
  ];

  const initialTab = tabs.find(tab => tab.path === location.pathname)?.name || 'All';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    // Set initial underline position
    if (tabRefs.current[activeTab]) {
      const tab = tabRefs.current[activeTab];
      setUnderlineStyle({
        width: `${tab.offsetWidth}px`,
        left: `${tab.offsetLeft}px`
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <div className="footer">
      {tabs.map(tab => (
        <div
          key={tab.name}
          className={`tab ${activeTab === tab.name ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
          ref={el => tabRefs.current[tab.name] = el}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default Footer;
