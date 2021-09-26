import SASS_VARIABLES from '@/assets/scss/main.scss'
import Vuetify from 'vuetify/lib'

export const VuetifyPlugin = Vuetify

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      // https://vuetifyjs.com/en/features/theme/
      // TODO: adapt to the reality of the project.
      light: {
        primary: {
          base: SASS_VARIABLES['color-primary'],
          lighten1: SASS_VARIABLES['color-primary-light'],
          lighten2: SASS_VARIABLES['color-primary-lighter'],
          lighten3: SASS_VARIABLES['color-primary-lightest']
        },
        secondary: {
          base: SASS_VARIABLES['color-secondary'],
          lighten1: SASS_VARIABLES['color-secondary-light'],
          lighten2: SASS_VARIABLES['color-secondary-lighter'],
          lighten3: SASS_VARIABLES['color-secondary-lightest']
        },
        twilight: SASS_VARIABLES['color-twilight-blue'],
        accent: SASS_VARIABLES['color-accent'],
        darkgrey: SASS_VARIABLES['color-dark-grey'],
        dovegrey: SASS_VARIABLES['color-dove-gray'],
        'darkgrey-1': SASS_VARIABLES['color-dark-grey-1'],
        'medium-gray': SASS_VARIABLES['color-medium-gray']
      }
    }
  }
})
