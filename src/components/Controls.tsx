import { motion } from 'framer-motion';

import { ease } from '../animations';

import LanguageToggle from './LanguageToggle';
import Nav from './Nav';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

function Controls() {
  return (
    <motion.div
      className="controls"
      layout
      transition={{ duration: 0.55, ease }}
    >
      <Nav />
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
