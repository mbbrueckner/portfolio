import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ease } from '../animations';
import { scrollToSection } from '../scroll';

import '../styles/Nav.css';

interface NavProps {
  isVisible: boolean;
}

const items = [
  { id: 'top', index: '00', labelKey: 'hero.eyebrow' },
  { id: 'projects', index: '01', labelKey: 'projects.eyebrow' },
  { id: 'about', index: '02', labelKey: 'about.eyebrow' },
  { id: 'contact', index: '03', labelKey: 'contact.eyebrow' },
] as const;

const navVariants: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: { duration: 1.1, ease },
  },
  visible: {
    width: 'auto',
    opacity: 1,
    transition: { duration: 1.8, ease, delayChildren: 0.5, staggerChildren: 0.13 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 14, transition: { duration: 0.4, ease } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

function Nav({ isVisible }: NavProps) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>(items[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let current: string = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= center) current = item.id;
      }

      // The last section is too short to cross the center on tall viewports,
      // so hitting the bottom of the page always selects it.
      const bottom = window.scrollY + window.innerHeight;
      if (bottom >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1].id;
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
    <motion.div
      className="nav"
      variants={navVariants}
      initial={false}
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <nav aria-label={t('nav.label')} aria-hidden={!isVisible}>
        <ul className="nav__list">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <motion.li key={item.id} variants={itemVariants}>
                <a
                  className={`nav__link${isActive ? ' is-active' : ''}`}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={isVisible ? undefined : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.id);
                    history.replaceState(null, '', `#${item.id}`);
                  }}
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
  );
}

export default Nav;
