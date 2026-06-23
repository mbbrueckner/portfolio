import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { fadeUp, stagger } from '../animations';
import { projects } from '../data/projects';

import '../styles/Projects.css';

function Projects() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="projects"
      className="section projects"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="section-head" variants={fadeUp}>
        <p className="section-head__eyebrow">{t('projects.eyebrow')}</p>
        <div className="section-head__rule" />
      </motion.div>

      <motion.ul className="projects__list" variants={stagger}>
        {projects.map((project, index) => (
          <motion.li className="project" key={project.id} variants={fadeUp}>
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
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

export default Projects;
