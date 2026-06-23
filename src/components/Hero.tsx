import { useTranslation } from 'react-i18next';

import '../styles/Hero.css';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" data-screen-label="hero">
      <h1 className="hero__name">{t('hero.name')}</h1>
      <div className="hero__divider" />
      <p className="hero__title">{t('hero.title')}</p>

      <div className="hero__scroll">
        <span className="hero__scroll-label">{t('hero.scroll')}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
