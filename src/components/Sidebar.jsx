import Logo from "./Logo"
import AppNav from "./AppNav"
import CountryList from "./CountryList"
import styles from "./Sidebar.module.css"
import { Outlet } from "react-router-dom"
export default function Sidebar(){
    return <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}> &copy; CopyRight {new Date().getFullYear()} by worldwise INC </p>
        </footer>
    </div>    
}