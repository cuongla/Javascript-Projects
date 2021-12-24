const projectBox = document.querySelector('.project-box');
const projectContainer = document.querySelector('.projects-container');

let projectsData = [];
const rootProject = '/projects';

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
            src: project.image,
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
        itemLink.textContent = 'Live Demo'

        // Assign to image overlay
        itemOverlay.appendChild(itemTitle);
        itemOverlay.appendChild(itemLink);

        // Assign image overlay to Project box
        projectBox.appendChild(img);
        projectBox.appendChild(itemOverlay);

        projectContainer.appendChild(projectBox);
    })
}

async function getProjectsData() {
    try {
        await fetch('./projectsData.json')
            .then(res => res.json())
            .then(data => {
                projectsData = Object.values(data.projects);
            });
        displayProjects();
    } catch (error) {
        console.log('An Error Occured', error);
    }
}

// On Load
getProjectsData();