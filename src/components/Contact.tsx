import { useTranslation } from 'react-i18next';

import { contactEmail, socialLinks } from '../data/contact';

import '../styles/Contact.css';

function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section contact">
      <div className="section-head">
        <p className="section-head__eyebrow">{t('contact.eyebrow')}</p>
        <div className="section-head__rule" />
      </div>

      <a className="contact__email" href={`mailto:${contactEmail}`}>
        {contactEmail}
      </a>

      <div className="contact__socials">
        {socialLinks.map((link) => (
          <a
            className="contact__social"
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;
