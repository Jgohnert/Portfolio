
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
            const card = document.createElement('a');
            card.href = link.url.startsWith('http') ? link.url : 'https://' + link.url;
            card.target = '_blank';
            card.rel = 'noopener';
            card.classList.add('project-link');

            if (link.image) {
                const img = document.createElement('img');
                img.src = link.image;
                img.alt = '';
                img.loading = 'lazy';
                card.appendChild(img);
            }

            const title = document.createElement('span');
            title.classList.add('project-title');
            title.textContent = link.title;
            card.appendChild(title);

            allDesignProjects.appendChild(card);
        });
    });
};

getProjectLinks();
