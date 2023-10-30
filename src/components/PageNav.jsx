import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from "../components/Logo"
export default function PageNav(){
   return <nav className={styles.nav}>
               <Logo/>

        <ul>
            <li>
                <NavLink to="/Product"> Product </NavLink>
            </li>
            <li>
                <NavLink to="/Price"> Price </NavLink>
            </li>
            <li>
                <NavLink className={styles.ctaLink} to="/Login">login</NavLink> 
            </li>
        </ul>
    </nav>
}