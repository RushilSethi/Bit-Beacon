import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import icon from "../images/logo.png";
import home from "../images/icons/home.svg";
import exchange from "../images/icons/exchange.svg";
import chart from "../images/icons/chart.svg";
import bulb from "../images/icons/bulb.svg";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Bit Beacon</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <>
          <Menu theme="dark">
            <Menu.Item
              icon={<img src={home} width={16} height={16} alt="nav-icon" />}
            >
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              icon={<img src={chart} width={16} height={16} alt="nav-icon" />}
            >
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item
              icon={
                <img src={exchange} width={16} height={16} alt="nav-icon" />
              }
            >
              <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item
              icon={<img src={bulb} width={16} height={16} alt="nav-icon" />}
            >
              <Link to="/news">News</Link>
            </Menu.Item>
            <div className="special-nav-container">
              <button className="special-tab-button" 
              onClick={() => window.open("https://bit-beacon-mutualfunds.netlify.app/", "_blank")}
              >Mutual Fund Tracker</button>
            </div>
          </Menu>
          
        </>
      )}
    </div>
  );
};

export default Navbar;
