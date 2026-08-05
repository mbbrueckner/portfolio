import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { fadeUp, stagger } from '../animations';
import { contactEmail, socialLinks } from '../data/contact';

import '../styles/Contact.css';

function Contact() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="contact"
      className="section contact"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <motion.div className="section-head" variants={fadeUp}>
        <div className="section-head__top">
          <span className="section-head__index">03</span>
          <p className="section-head__eyebrow">{t('contact.eyebrow')}</p>
        </div>
        <div className="section-head__rule" />
      </motion.div>

      <motion.a
        className="contact__email"
        href={`mailto:${contactEmail}`}
        variants={fadeUp}
      >
        {t('contact.sayHello')}
      </motion.a>

      <motion.div className="contact__socials" variants={stagger}>
        <motion.a
          className="contact__social"
          href={`mailto:${contactEmail}`}
          variants={fadeUp}
        >
          {t('contact.emailLabel')}
        </motion.a>
        {socialLinks.map((link) => (
          <motion.a
            className="contact__social"
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Contact;
