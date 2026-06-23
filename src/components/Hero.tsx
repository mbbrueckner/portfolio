import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { fadeUp, stagger } from '../animations';

import '../styles/Hero.css';

function Hero() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="hero"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="hero__name" variants={fadeUp}>
        {t('hero.name')}
      </motion.h1>
      <motion.div className="hero__divider" variants={fadeUp} />
      <motion.p className="hero__title" variants={fadeUp}>
        {t('hero.title')}
      </motion.p>

      <motion.div className="hero__scroll" variants={fadeUp}>
        <span className="hero__scroll-label">{t('hero.scroll')}</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </motion.section>
  );
}

export default Hero;
