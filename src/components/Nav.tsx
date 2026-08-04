import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ease } from '../animations';

import '../styles/Nav.css';

const items = [
  { id: 'top', index: '00', labelKey: 'hero.eyebrow' },
  { id: 'projects', index: '01', labelKey: 'projects.eyebrow' },
  { id: 'about', index: '02', labelKey: 'about.eyebrow' },
  { id: 'contact', index: '03', labelKey: 'contact.eyebrow' },
] as const;

// Separate thresholds so scrolling around the hero edge cannot flicker the bar.
const SHOW_AT = 0.72;
const HIDE_AT = 0.55;

const navVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.35, ease } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function Nav() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>(items[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = window.scrollY / window.innerHeight;
      setIsVisible((wasVisible) =>
        wasVisible ? progress > HIDE_AT : progress > SHOW_AT,
      );

      const center = window.innerHeight / 2;
      let current: string = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= center) current = item.id;
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="nav"
          className="nav"
          layout
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <nav aria-label={t('nav.label')}>
            <ul className="nav__list">
              {items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <motion.li key={item.id} variants={itemVariants}>
                    <a
                      className={`nav__link${isActive ? ' is-active' : ''}`}
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {isActive && (
                        <motion.span
                          className="nav__highlight"
                          layoutId="nav-highlight"
                          transition={{ duration: 0.4, ease }}
                        />
                      )}
                      <span className="nav__index">{item.index}</span>
                      <span className="nav__label">{t(item.labelKey)}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          <span className="controls__divider" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Nav;
