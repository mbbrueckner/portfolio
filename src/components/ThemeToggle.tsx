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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const options: { value: Theme; glyph: string; label: string }[] = [
    { value: 'light', glyph: '☀', label: t('controls.lightMode') },
    { value: 'dark', glyph: '☾', label: t('controls.darkMode') },
  ];

  return (
    <div className="toggle" role="group" aria-label={t('controls.theme')}>
      {options.map(({ value, glyph, label }) => (
        <button
          key={value}
          type="button"
          className={`toggle__option toggle__option--icon${theme === value ? ' is-active' : ''}`}
          aria-pressed={theme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
        >
          {glyph}
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
