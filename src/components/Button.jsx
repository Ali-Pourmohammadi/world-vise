/* eslint-disable no-unused-vars */
import styles from "./Button.module.css"
export default function Button({children  , type , onclick }){
    return <button  onClick={onclick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
}