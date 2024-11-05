import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavMenu.module.css";
import imgClose from "../../../assets/icons/close_popup.svg";
import imgHam from "../../../assets/icons/hamburger.svg";

interface NavMenuProps {
  menuItems: { label: string; path: string }[];
}

export const NavMenu: FC<NavMenuProps> = ({ menuItems }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);
  const [IsNavActive,setIsNavActive] = useState<boolean>(false);
function handleNav() {setIsNavActive(!IsNavActive)}; 
  return (
  
  
    <nav className={styles.navbar__container} >
  <button onClick={handleNav} className={styles.button__nav__opener}>

    <img src={imgHam}/>
  </button>
      <ul className={styles.navbar__menu} style={IsNavActive?{display:"block"}:{}}>
        <li className={styles.button__nav__close}>
          
<button onClick={handleNav} style={{width:"24px",height:"24px",background:"#1D2633",border:0,}}>
<img src={imgClose}/>

</button>
        </li>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`${styles.navbar__menu__item} ${
              isActive(item.path) ? styles.active : ""
            }`}
          >
            <Link to={item.path} aria-label={item.label} onClick={handleNav}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
