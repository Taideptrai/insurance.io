# Environment Variables

This project use a combination of Environment Variables to be able to dinamically change configurations.

The environment variables can be set through:

* Server environment variables
* Docker Container configuration
* `.env` file (local development only)

## Environment Variables Available

```env
NODE_ENV

VUE_APP_API_HOST*
VUE_APP_TENANT_ID*
VUE_APP_BASE_URL*
VUE_APP_I18N_LOCALE*

VUE_APP_SECURE_COOKIE
VUE_APP_SECURE_HOST

SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
VUE_APP_SENTRY_DSN
VUE_APP_SENTRY_GIT_REPO

VUE_APP_TEST_API_USER
VUE_APP_TEST_API_PASSWORD
```

* `NODE_ENV`: Node environment. Defaults to `development`
* `VUE_APP_TENANT_ID`* Tenant ID of the Application (required).
* `VUE_APP_BASE_URL`* The base URL your application bundle will be deployed at. Defaults to `/`
* `VUE_APP_I18N_LOCALE`* Application default locale (en, fr, es, pt-br). It follows `i18n` convention.
* `VUE_APP_API_HOST`* API host domain (without http/https),
* `VUE_APP_SECURE_COOKIE` if application will use secure cookies or not (default `false`).
* `VUE_APP_SECURE_HOST` if application will use secure communication (https/wss) with the API (defaults `false`).

**Sentry Related:**

  * `SENTRY_AUTH_TOKEN`: Sentry authentication token (provided when you create a Sentry project).
  * `SENTRY_ORG`: Sentry organization name/slug
  * `SENTRY_PROJECT`: Sentry Project name/slug
  * `VUE_APP_SENTRY_DSN`: Sentry DNS url (used to log errors/warnings/etc)
  * `VUE_APP_SENTRY_GIT_REPO`: Sentry Github Repository (necessary to track faulty commits)

**Development use only**

* `VUE_APP_TEST_API_USER`: username used to login to the application, this saves time when authentication locally.
* `VUE_APP_TEST_API_PASSWORD`: username password


**\*** required environment variable


# Local development (Front End)

You can use both Docker environment variables or run project locally using `yarn`.

Case you decide to use `yarn`, it will be necessary to provide a valid `.env` file with the necessary environment variables. Check `.env.sample` for further details.

```
> cp .env.sample .env
```

Then, just edit .env file to configure your local env.


### Further reading:

* https://cli.vuejs.org/guide/mode-and-env.html
