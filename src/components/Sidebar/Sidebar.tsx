import React, { useEffect } from "react";
import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.svg"
import plusIcon from "/icon/plus.svg";
import angleLeft from "/icon/angle-left.svg";
import angleRight from "/icon/angle-right.svg";

type TypeSidebarItem = {
  id: number;
  count: number;
  href: string;
  value: string;
  icon: string;
};
interface Props {
  userData: object;
  sidebarItems: TypeSidebarItem[];
  toHideSidebar: boolean;
  setToHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({
  userData,
  toHideSidebar,
  setToHideSidebar,
  sidebarItems,
  setOpenMenu,
}) => {
  useEffect(() => {
    const handleResize = () => {
      setToHideSidebar(window.innerWidth <= 560);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setToHideSidebar(!toHideSidebar);
  };
  return (
    <aside className={toHideSidebar ? "sidebar" : "sidebar sidebar-close"}>
      <div>
        <Link to={"/home"}>
        <div className="logo">
          <img className="logo__img" src={logo} alt="logo" />
          <p className="logo__text">NoteWave</p>
        </div>
        </Link>
        <button className='sidebar__hide-btn' onClick={toggleSidebar}>
          {toHideSidebar ? (
            <img src={angleLeft} alt='' />
          ) : (
            <img src={angleRight} alt='' />
          )}
        </button>
        <ul>
          {sidebarItems.map((sidebarItem) => (
            <NavLink
              onClick={() => setOpenMenu(true)}
              className={({ isActive }) =>
                isActive ? "sidebar__link-active" : ""
              }
              key={sidebarItem.id}
              to={sidebarItem.href}
            >
              <img
                className='icon'
                src={`/icon/${sidebarItem.icon}`}
                alt={sidebarItem.value}
              />
              <p>{sidebarItem.value}</p>
            </NavLink>
          ))}
        </ul>
      </div>
      <div>
        <Link to={"/add"}
          className={
            toHideSidebar
              ? "sidebar__new-note-btn"
              : "sidebar-close__new-note-btn"
          }
        >
          <p>New Note </p>
          <img className='icon' src={plusIcon} alt='plas' />
        </Link>
      </div>
    </aside>
  );
};
export default Sidebar;
