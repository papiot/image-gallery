(function gallery() {
    const BASE_IMAGE_URL = "http://placekitten.com/400/300?image=";
    const MIN_IMAGES = 0;
    const MAX_IMAGES = 30;

    let arrayOfImageSources = [];
    let currentIndex = 0;
    let image;
    let counterElement;

    // Used for touch events
    let xDown = null;                                                        
    let yDown = null;    

    function createImageArray(max) {
        for (let i = 0; i < max; i++) {
            arrayOfImageSources.push(BASE_IMAGE_URL + i);
        }
    }

    function createGallery() {
        image = createImage(currentIndex);
        counterElement = document.getElementById('counter');
        if (counterElement) {
            counterElement.innerText = getCounterText();
        }

        document.getElementById('main-container').appendChild(createButton("back", () => {
            onClickButton('left');
        }));
        document.getElementById('main-container').appendChild(image);
        document.getElementById('main-container').appendChild(createButton("next", () => {
            onClickButton('right');
        }));
    }

    function updateImageSource(direction) {
        switch (direction) {
            case 'left':
                currentIndex--;
                if (currentIndex < MIN_IMAGES) {
                    currentIndex = MAX_IMAGES - 1;
                }
                image.src = arrayOfImageSources[currentIndex];
                break;
            case 'right':
                currentIndex++;
                if (currentIndex >= MAX_IMAGES-1) {
                    currentIndex = 0;
                }
                image.src = arrayOfImageSources[currentIndex];
                break;
            default:
                break;
        }
        if (counterElement) {
            counterElement.innerText = getCounterText();
        }
    }

    function onClickButton(direction) {
        updateImageSource(direction);
    }

    function getCounterText() {
        return `${currentIndex + 1} / ${MAX_IMAGES}`;
    }

    function createButton(direction, onButtonClick) {
        let button = document.createElement('div');
        button.className = direction === 'back' ? 'button backButton' : 'button nextButton';
        button.addEventListener('click', () => onButtonClick());
        return button;
    }

    function createImage() {
        let image = document.createElement('img');
        image.className = 'imageContainerClass';
        image.src = BASE_IMAGE_URL + currentIndex;
        
        image.addEventListener('touchstart', (event) => {
            xDown = event.touches[0].clientX;                                      
            yDown = event.touches[0].clientY;
        });
        image.addEventListener('touchmove', (event) => {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = event.touches[0].clientX;                                    
            var yUp = event.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    updateImageSource('right');
                } else {
                    updateImageSource('left');
                }                       
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;        
                    });
            return image;
        }

    createImageArray(MAX_IMAGES);
    createGallery();
})()
