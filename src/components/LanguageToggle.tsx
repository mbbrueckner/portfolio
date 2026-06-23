import { useTranslation } from 'react-i18next';

import { supportedLanguages } from '../i18n';

function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div className="toggle" role="group" aria-label={t('controls.language')}>
      {supportedLanguages.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`toggle__option${current === lng ? ' is-active' : ''}`}
          aria-pressed={current === lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default LanguageToggle;
