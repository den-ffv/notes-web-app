import React from "react";
import "./MobileMenu.scss";
import { sidebar } from "/icon/sidebar.svg";
import logo from "/logo.svg";
import plusIcon from "/icon/plus.svg";
import { Link, NavLink } from "react-router-dom";

type TypeMenuItems = {
  id: number;
  count: number;
  href: string;
  value: string;
  icon: string;
};

type TypeModileMenuPrors = {
  sidebarItems: TypeMenuItems[];
  openPhomeMenu: boolean;
  setOpenPhoneMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu: React.FC<TypeModileMenuPrors> = ({
  sidebarItems,
  openPhomeMenu,
  setOpenPhoneMenu,
}) => {
  console.log(openPhomeMenu, "---");
  return (
    <div
    onClick={() => setOpenPhoneMenu(false)}
      className={openPhomeMenu ? "phome-menu phome-menu-active" : "phome-menu"}
    >
      <Link to={"/home"}>
        <div className='logo'>
          <img className='logo__img' src={logo} alt='logo' />
          <p className='logo__text'>NoteWave</p>
        </div>
      </Link>
      <ul className='phome-menu__list-item'>
        {sidebarItems.map((sidebarItem) => (
          <NavLink
            onClick={() => setOpenPhoneMenu(false)}
            className={({ isActive }) =>
              isActive ? "menu-link menu-link__active" : "menu-link"
            }
            key={sidebarItem.id}
            to={sidebarItem.href}
          >
            <img
              className='menu-link__img'
              src={`/icon/${sidebarItem.icon}`}
              alt={sidebarItem.value}
            />
            <p className='menu-link__text'>{sidebarItem.value}</p>
          </NavLink>
        ))}
      </ul>
      <Link to={"/add"} className={"sidebar__new-note-btn"}>
        <p>New Note </p>
        <img className='icon' src={plusIcon} alt='plas' />
      </Link>
    </div>
  );
};

export default MobileMenu;
