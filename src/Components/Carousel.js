// Imports
import {useState } from 'react';
import styles from '../Styles/Carousel.module.css';

// Component to show images carousel of the album
function Carousel({ images, handleCloseCarousel, imageIndex }) {
    // States
    const [currentIndex, setCurrentIndex] = useState(imageIndex >= 0 ? imageIndex : 0);

    // Handling to go previous image
    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Handling to go next image
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // Returning JSX
    return (
        // Carousel container
        <div className={styles.carouselContainer}>
            {/* Close icon */}
            <span className={styles.closeIcon} onClick={handleCloseCarousel}>
                <img src='https://cdn-icons-png.flaticon.com/128/463/463612.png' alt='Close'/>
            </span>
            {/* Image container */}
            <div className={styles.carouselImage}>
                <img src={images[currentIndex].imageUrl} alt={images[currentIndex].title} />
            </div>
            {/* Left and right buttons navigations */}
            <div className={styles.navigation}>
                {/* Left arrow */}
                <span className={styles.leftArrow} onClick={goToPreviousSlide}>
                    <img src='https://cdn-icons-png.flaticon.com/128/8804/8804952.png' alt='Previous'/>
                </span>
                {/* Right Arrow */}
                <span className={styles.rightArrow} onClick={goToNextSlide}>
                <img src='https://cdn-user-icons.flaticon.com/132185/132185789/1704220679344.svg?token=exp=1704221580~hmac=eee299c4d7acb41cb940b3dfed6a632a' alt='Next'/>
                </span>
            </div>
        </div>
        
    );
}

// Exporting Carousel
export default Carousel;
