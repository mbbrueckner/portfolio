import 'i18next';

import type { defaultNS, resources } from './index';

// Make t() and useTranslation() aware of our resource shape so translation
// keys are type-checked at compile time.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['de'];
  }
}
