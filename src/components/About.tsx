import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { fadeIn, fadeUp, panelIn, stagger } from '../animations';
import { aboutBio, aboutPortrait, aboutStats } from '../data/about';
import { useLocale } from '../hooks/useLocale';

import '../styles/About.css';

function About() {
  const { t } = useTranslation();
  const locale = useLocale();

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

      <motion.div
        className={`about__grid${aboutPortrait ? ' has-portrait' : ''}`}
        variants={panelIn}
      >
        {aboutPortrait && (
          <motion.img
            className="about__portrait"
            src={aboutPortrait.src}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            alt={aboutPortrait.alt[locale]}
            loading="lazy"
            decoding="async"
            variants={fadeIn}
          />
        )}
        <motion.p className="about__bio" variants={fadeIn}>
          {aboutBio[locale]}
        </motion.p>
        <motion.dl className="about__stats" variants={stagger}>
          {aboutStats.map((stat) => (
            <motion.div className="about__stat" key={stat.id} variants={fadeIn}>
              <dt className="about__stat-label">{stat.label[locale]}</dt>
              <dd className="about__stat-value">{stat.value[locale]}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </motion.section>
  );
}

export default About;
