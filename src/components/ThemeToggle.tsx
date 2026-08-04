import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t('controls.theme')}
      className={`switch${isDark ? ' is-on' : ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="switch__knob" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
