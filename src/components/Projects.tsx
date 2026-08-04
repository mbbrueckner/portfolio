import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { ease, fadeUp, stagger } from '../animations';
import { projects } from '../data/projects';
import { useActiveOnScroll } from '../hooks/useActiveOnScroll';

import '../styles/Projects.css';

type ProjectEntry = (typeof projects)[number];

interface ProjectItemProps {
  project: ProjectEntry;
  index: number;
  isActive: boolean;
  isPinned: boolean;
  onToggle: (id: string) => void;
}

function ProjectItem({
  project,
  index,
  isActive,
  isPinned,
  onToggle,
}: ProjectItemProps) {
  const { t } = useTranslation();
  const cardId = `${project.id}-card`;

  return (
    <li
      className={`project${isActive ? ' is-active' : ''}${
        isPinned ? ' is-pinned' : ''
      }`}
    >
      <div className="project__inner">
        <button
          type="button"
          className="project__row"
          data-scroll-id={project.id}
          onClick={() => onToggle(project.id)}
          aria-expanded={isActive}
          aria-controls={cardId}
        >
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
            <span className="project__marker" aria-hidden="true" />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="card"
              id={cardId}
              className="project__card"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="project__card-body">
                <p className="project__description">
                  {t(`projects.items.${project.id}.description`)}
                </p>
                <ul className="project__stack">
                  {project.stack.map((tech, techIndex) => (
                    <li className="project__chip" key={`${project.id}-${techIndex}`}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  className="project__link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('projects.viewProject')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

function Projects() {
  const { t } = useTranslation();
  const { containerRef, activeId, pinnedId, togglePinned } =
    useActiveOnScroll<HTMLUListElement>(projects[0]?.id ?? null);

  return (
    <motion.section
      id="projects"
      className="section projects"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <motion.div className="section-head" variants={fadeUp}>
        <div className="section-head__top">
          <span className="section-head__index">01</span>
          <p className="section-head__eyebrow">{t('projects.eyebrow')}</p>
        </div>
        <div className="section-head__rule" />
      </motion.div>

      <ul className="projects__list" ref={containerRef}>
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            isActive={project.id === activeId}
            isPinned={project.id === pinnedId}
            onToggle={togglePinned}
          />
        ))}
      </ul>
    </motion.section>
  );
}

export default Projects;
