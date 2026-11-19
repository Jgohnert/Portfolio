
const designLinksURL = 'https://jgohnert.github.io/Portfolio/data/design-links.json';

const allDesignProjects = document.querySelector('#design-projects');

async function getProjectLinks() {
    const response = await fetch(designLinksURL);
    const data = await response.json();
    const projectActivities = data.design;

    displayDesignProjects(projectActivities);
}

const displayDesignProjects = (projectActivities) => {
    projectActivities.forEach((project) => {

        project.links.forEach((link) => {
            let linkList = document.createElement('a');

            linkList.href = link.url.startsWith('http')
                ? link.url
                : 'https://' + link.url;

            linkList.textContent = link.title;
            linkList.classList.add('project-link');
            linkList.target = '_blank';

            allDesignProjects.appendChild(linkList);
        });

    });
};

getProjectLinks();
