import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { fadeUp, stagger } from '../animations';
import { aboutStats } from '../data/about';

import '../styles/About.css';

function About() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      className="section about"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <motion.div className="section-head" variants={fadeUp}>
        <div className="section-head__top">
          <span className="section-head__index">02</span>
          <p className="section-head__eyebrow">{t('about.eyebrow')}</p>
        </div>
        <div className="section-head__rule" />
      </motion.div>

      <div className="about__grid">
        <motion.p className="about__bio" variants={fadeUp}>
          {t('about.bio')}
        </motion.p>
        <motion.dl className="about__stats panel" variants={stagger}>
          {aboutStats.map((stat) => (
            <motion.div className="about__stat" key={stat.id} variants={fadeUp}>
              <dt className="about__stat-label">{t(`about.stats.${stat.id}`)}</dt>
              <dd className="about__stat-value">{stat.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
}

export default About;
