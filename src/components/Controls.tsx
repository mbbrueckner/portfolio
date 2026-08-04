import { useScrolledPastHero } from '../hooks/useScrolledPastHero';

import LanguageToggle from './LanguageToggle';
import Nav from './Nav';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

function Controls() {
  const isNavVisible = useScrolledPastHero();

  return (
    <div className="controls">
      <Nav isVisible={isNavVisible} />
      <div className="controls__group">
        <LanguageToggle />
      </div>
      <span className="controls__divider" />
      <div className="controls__group">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Controls;
