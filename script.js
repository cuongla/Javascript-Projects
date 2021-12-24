const projectBox = document.querySelector('.project-box');
const projectContainer = document.querySelector('.projects-container');
const loaderContainer = document.querySelector('.loader-container');

let projectsData = [];
const rootProject = '/projects';

function loading() {
    loaderContainer.hidden = false;
    projectContainer.hidden = true;
}

function stopLoading() {
    loaderContainer.hidden = true;
    projectContainer.hidden = false;
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayProjects() {
    projectsData.forEach(project => {
        // Create Project Box
        const projectBox = document.createElement('div');
        projectBox.classList.add('project-box');

        const img = document.createElement('img');
        setAttributes(img, {
            src: project.imageUrl,
            alt: project.title,
            title: project.title
        });

        // Image Overlay
        const itemOverlay = document.createElement('div');
        itemOverlay.classList.add('image-overlay');
        // Project Title
        const itemTitle = document.createElement('h4');
        itemTitle.textContent = project.title;
        // Project Link
        const itemLink = document.createElement('a');
        setAttributes(itemLink, {
            href: `/projects${project.fileName}`,
            target: '_blank',
        });
        itemLink.textContent = 'Live Website'
        // Project Link
        const githubLink = document.createElement('a');
        setAttributes(githubLink, {
            href: project.github,
            target: '_blank',
        });
        githubLink.textContent = 'Code Source'

        // Assign to image overlay
        itemOverlay.appendChild(itemTitle);
        itemOverlay.appendChild(itemLink);
        itemOverlay.appendChild(githubLink);


        // Assign image overlay to Project box
        projectBox.appendChild(img);
        projectBox.appendChild(itemOverlay);

        projectContainer.appendChild(projectBox);
    });
}

async function getProjectsData() {
    try {
        loading();
        await fetch('./projectsData.json')
            .then(res => res.json())
            .then(data => {
                projectsData = Object.values(data.projects);
                stopLoading();
            });
        displayProjects();
    } catch (error) {
        console.log('An Error Occured', error);
    }
}

// On Load
getProjectsData();