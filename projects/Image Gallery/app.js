const images = document.querySelectorAll(".wrapper .image img");
const gallery = document.querySelector(".gallery");
const galleryImg = document.querySelector(".gallery-inner img");
const closeButton = document.querySelector(".gallery .close");

const prevButton = document.querySelector('.control.prev');
const nextButton = document.querySelector('.control.next');

let currentIndex = 0;
const lastIndex = images.length - 1

function galleryShow() {
    if (currentIndex == 0) {
        prevButton.classList.add('hide');
    } else {
        prevButton.classList.remove('hide');
    }

    if (currentIndex == lastIndex) {
        nextButton.classList.add('hide');
    } else {
        nextButton.classList.remove('hide');
    }

    galleryImg.src = images[currentIndex].src;
    gallery.classList.add('show');
}

function closeGallery() {
    gallery.classList.remove('show');
}

images.forEach((item, index) => {
    item.addEventListener('click', function () {
        currentIndex = index;
        galleryShow();
    })
})

// Buttons Events
prevButton.addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        galleryShow();
    }
});
nextButton.addEventListener('click', function () {
    if (currentIndex < lastIndex) {
        currentIndex++;
        galleryShow();
    }
});
closeButton.addEventListener('click', closeGallery);
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) closeGallery();
});