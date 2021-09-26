import { APP_VERSION, BASE_URL, ENVIRONMENT, SENTRY_AUTH_TOKEN, SENTRY_GIT_REPO } from './src/core/config'

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import GitRevisionPlugin from 'git-revision-webpack-plugin'
import SentryWebpackPlugin from '@sentry/webpack-plugin'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

const PERFORMANCE_MIN_SIZE = 10240 // 10kb
const PERFORMANCE_MAX_SIZE = 256000 // 250kb

const gitRevisionPlugin = new GitRevisionPlugin()

// NOTE: to debug bundle size, use: npm run build -- --bundle-analyzer
const shouldLoadBundleAnalyzer = process.argv.includes('--bundle-analyzer')

export default {
  publicPath: BASE_URL,
  configureWebpack: config => {
    if (ENVIRONMENT === 'production' && SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: './dist',
          ignoreFile: '.sentryignore',
          release: APP_VERSION,
          setCommits: {
            repo: SENTRY_GIT_REPO,
            commit: gitRevisionPlugin.commithash()
          }
        })
      )
    }

    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
  },
  chainWebpack: config => {
    // PERFORMANCE
    config.performance.maxEntrypointSize(PERFORMANCE_MAX_SIZE).maxAssetSize(PERFORMANCE_MAX_SIZE)
    config.optimization.splitChunks({
      minSize: PERFORMANCE_MIN_SIZE,
      maxSize: PERFORMANCE_MAX_SIZE
    })
    // PLUGINS
    shouldLoadBundleAnalyzer && config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)

    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')

    config.plugin('VuetifyLoaderPlugin').use(VuetifyLoaderPlugin)
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use '@/assets/scss/abstracts/variables' as *;
          @use '@/assets/scss/abstracts/mixins' as *;
          @use '@/assets/scss/abstracts/functions' as *;
        `
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: ['vuetify']
}
