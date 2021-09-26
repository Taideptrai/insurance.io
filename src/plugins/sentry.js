import * as Integrations from '@sentry/integrations'
import * as Sentry from '@sentry/browser'

import { APP_VERSION, SENTRY_DSN } from '@/core/config'

import Vue from 'vue'
import { isProduction } from '@/core/helpers/env'

if (isProduction() && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: APP_VERSION,
    integrations: [new Integrations.Vue({ Vue })]
  })
}
