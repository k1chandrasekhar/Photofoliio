// Imports
import styles from "../Styles/album.module.css";

// Creating component for the album here.
function Album(props){
    // Returning JSX
    return (
        // Album container div whichs shows album name and image.
        <div className={styles.albumContainer} onClick={() => props.handleOpenImages(props.albumId, props.name)}>
            {/* Album image */}
            <div className={styles.imgContainer}>
            <img src="https://cdn-icons-png.flaticon.com/128/1339/1339298.png" alt="album" className={styles.albumImg}/>
            </div>
            {/* Album name */}
            <p>{props.name}</p>
        </div>
    )
}

// Exporting component.
export default Album;