FROM node:14-alpine as builder

ARG API_HOST
ARG SENTRY_DSN
ARG SENTRY_PROJECT
ARG SENTRY_ORG
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_GIT_REPO
ARG LOCALE
ARG SECURE
ARG TENANT_ID
ARG SECURE_COOKIE
ARG SECURE_HOST

ENV VUE_APP_API_HOST=$API_HOST
ENV VUE_APP_SENTRY_DSN=$SENTRY_DSN
ENV VUE_APP_SENTRY_GIT_REPO=$SENTRY_GIT_REPO
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV VUE_APP_I18N_LOCALE=$LOCALE
ENV VUE_APP_SECURE_HOST=${SECURE_HOST:-${SECURE:-""}}
ENV VUE_APP_SECURE_COOKIE=${SECURE_COOKIE:-${SECURE:-""}}
ENV VUE_APP_TENANT_ID=$TENANT_ID

ADD /. /code
# Adding .git folder to allow Sentry to identify faulty commits
ADD /.git /code/

WORKDIR /code

# RUN apk add --no-cache python make g++ git
RUN yarn install

# development stage
FROM builder as development

EXPOSE 8080

CMD "/bin/sh -c 'yarn install --frozen-lockfile && yarn serve'"

# production builder stage
FROM builder as builder-production

RUN yarn build

# production stage
FROM nginx:1.19.7-alpine as production

COPY --from=builder-production /code/environment/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder-production /code/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
