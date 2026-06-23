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
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="section-head" variants={fadeUp}>
        <p className="section-head__eyebrow">{t('contact.eyebrow')}</p>
        <div className="section-head__rule" />
      </motion.div>

      <motion.a
        className="contact__email"
        href={`mailto:${contactEmail}`}
        variants={fadeUp}
      >
        {contactEmail}
      </motion.a>

      <motion.div className="contact__socials" variants={stagger}>
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
