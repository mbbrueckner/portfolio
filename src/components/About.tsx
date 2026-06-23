import { useTranslation } from 'react-i18next';

import { aboutStats } from '../data/about';

import '../styles/About.css';

function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about">
      <div className="section-head">
        <p className="section-head__eyebrow">{t('about.eyebrow')}</p>
        <div className="section-head__rule" />
      </div>

      <div className="about__grid">
        <p className="about__bio">{t('about.bio')}</p>
        <dl className="about__stats">
          {aboutStats.map((stat) => (
            <div className="about__stat" key={stat.id}>
              <dt className="about__stat-label">{t(`about.stats.${stat.id}`)}</dt>
              <dd className="about__stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default About;
