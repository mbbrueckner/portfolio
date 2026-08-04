import { motion } from 'framer-motion';

import { ease } from '../animations';
import { useScrolledPastHero } from '../hooks/useScrolledPastHero';

import LanguageToggle from './LanguageToggle';
import Nav from './Nav';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

function Controls() {
  const isNavVisible = useScrolledPastHero();

  return (
    <motion.div
      className="controls"
      layout
      style={{ borderRadius: 999 }}
      transition={{ duration: 0.6, ease }}
    >
      <Nav isVisible={isNavVisible} />
      <motion.div className="controls__group" layout>
        <LanguageToggle />
      </motion.div>
      <motion.span className="controls__divider" layout />
      <motion.div className="controls__group" layout>
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
}

export default Controls;
