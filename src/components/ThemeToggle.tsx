import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow the system setting until an explicit choice is stored.
  useEffect(() => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'light' : 'dark');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const choose = (next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t('controls.theme')}
      className={`switch${isDark ? ' is-on' : ''}`}
      onClick={() => choose(isDark ? 'light' : 'dark')}
    >
      <span className="switch__knob" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
