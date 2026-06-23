import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

function Controls() {
  return (
    <div className="controls">
      <LanguageToggle />
      <span className="controls__divider" />
      <ThemeToggle />
    </div>
  );
}

export default Controls;
