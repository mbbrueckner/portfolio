import { AnimatePresence, motion } from 'framer-motion';
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

function Nav() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>(items[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsVisible(window.scrollY > window.innerHeight * 0.65);

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
        <motion.nav
          className="nav"
          aria-label={t('nav.label')}
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease }}
        >
          <ul className="nav__list">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    className={`nav__link${isActive ? ' is-active' : ''}`}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="nav__index">{item.index}</span>
                    <span className="nav__label">{t(item.labelKey)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Nav;
