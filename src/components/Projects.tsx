import { useTranslation } from 'react-i18next';

import { projects } from '../data/projects';

import '../styles/Projects.css';

function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section projects">
      <div className="section-head">
        <p className="section-head__eyebrow">{t('projects.eyebrow')}</p>
        <div className="section-head__rule" />
      </div>

      <ul className="projects__list">
        {projects.map((project, index) => (
          <li className="project" key={project.id}>
            <div className="project__main">
              <span className="project__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="project__title">{project.title}</span>
            </div>
            <div className="project__meta">
              <span className="project__tags">
                {t(`projects.items.${project.id}.tags`)}
              </span>
              <span className="project__year">{project.year}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
