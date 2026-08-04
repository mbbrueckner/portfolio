import { motion } from 'framer-motion';

import { ease } from '../animations';
import { useScrolledPastHero } from '../hooks/useScrolledPastHero';

import LanguageToggle from './LanguageToggle';
import Nav from './Nav';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

const pillTransition = { duration: 1.8, ease };

function Controls() {
  const isNavVisible = useScrolledPastHero();

  return (
    <motion.div
      className="controls"
      layout
      style={{ borderRadius: 999 }}
      transition={pillTransition}
    >
      <Nav isVisible={isNavVisible} />
      <motion.div
        className="controls__group"
        layout
        transition={pillTransition}
      >
        <LanguageToggle />
      </motion.div>
      <motion.span
        className="controls__divider"
        layout
        transition={pillTransition}
      />
      <motion.div
        className="controls__group"
        layout
        transition={pillTransition}
      >
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
}

export default Controls;
