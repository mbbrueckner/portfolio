import { useMediaQuery } from '../hooks/useMediaQuery';
import { useScrolledPastHero } from '../hooks/useScrolledPastHero';

import LanguageToggle from './LanguageToggle';
import Nav from './Nav';
import ThemeToggle from './ThemeToggle';

import '../styles/Controls.css';

// Below this width the pill carries settings only: four bare section numbers
// are not self-explanatory, and the page is short enough to just scroll.
const COMPACT_QUERY = '(max-width: 720px)';

function Controls() {
  const isCompact = useMediaQuery(COMPACT_QUERY);
  const isNavVisible = useScrolledPastHero();

  return (
    <div className="controls">
      {!isCompact && <Nav isVisible={isNavVisible} />}
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
