// Imports
import styles from "../Styles/Navbar.module.css";

// Creating component for the navbar here.
function Navbar(){
    // Returning JSX
    return (
        // Navbar container
        <div className={styles.navbarContainer}>
            {/* Logo and title */}
                <img src="https://cdn-icons-png.flaticon.com/128/1358/1358994.png" alt="Logo"/>
                <h3>PhotoFolio</h3>
        </div>
    )
}

// Exporting component.
export default Navbar;