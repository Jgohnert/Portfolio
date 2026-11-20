const caseStudyURL = 'data/portfolio-projects.json';
const caseStudySection = document.querySelector('#case-study');

async function getCaseStudy() {
    try {
        const response = await fetch(caseStudyURL, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const studyName = caseStudySection.dataset.study;
        const study = data[studyName];
        if (!study) throw new Error(`No case study called "${studyName}" in the JSON`);

        const slides = study.flatMap((project) => project.images);
        displaySlides(slides);
    } catch (error) {
        console.error('Could not load the case study:', error);
        const message = document.createElement('p');
        message.textContent = 'Sorry, the case study could not be loaded.';
        caseStudySection.appendChild(message);
    }
}

const displaySlides = (slides) => {
    slides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.img;
        img.alt = slide.alt;
        img.classList.add('case-study-slide');
        if (index > 0) img.loading = 'lazy';

        if (!slide.link) {
            caseStudySection.appendChild(img);
            return;
        }

        const link = document.createElement('a');
        link.href = slide.link.startsWith('http') ? slide.link : 'https://' + slide.link;
        link.target = '_blank';
        link.rel = 'noopener';
        link.classList.add('slide-link');

        const linkText = document.createElement('span');
        linkText.classList.add('slide-link-text');
        linkText.textContent = (slide.linkText || 'View the prototype');

        link.append(img, linkText);
        caseStudySection.appendChild(link);
    });
};

getCaseStudy();