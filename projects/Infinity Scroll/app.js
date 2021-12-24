const imageContainer = document.querySelector('#image-container')
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unplash API
const count = 10;
const apiKey = 'VMm3FQkBk7R_MQR1pL-LamKrfLpBLqXdaYajS0oxKX8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function loadImages() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

async function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        // Create a tag
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Put <img> inside <a>, and then inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray = data;
        displayPhotos();
    } catch (error) {
        console.log('An error occured', error);
    }
}

// Check if scrolling near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = false;
        getPhotos();
    }
})

// On Load
getPhotos();