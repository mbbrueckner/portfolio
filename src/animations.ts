import { cubicBezier, type Variants } from 'framer-motion';

export const ease = cubicBezier(0.22, 1, 0.36, 1);

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

// Unfolds from a hairline like an opening project card. Needs `overflow:
// hidden` on the element and its padding on an inner wrapper, otherwise the
// collapsed state still shows a padded strip.
export const unfold: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.95, ease },
      opacity: { duration: 0.45, ease },
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

// Contents only fade, so they do not compound with the panel's own movement.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Wider spacing than `stagger`: list rows are large, so they need room to read
// as a cascade rather than as one block.
export const listStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.18 },
  },
};
