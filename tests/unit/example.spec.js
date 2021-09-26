import { createLocalVue, mount } from '@vue/test-utils'

import { NotificationMessage } from '@/components/common/notification'
import { VuetifyInstance } from '@/plugins'

/**
 * Test Example
 * This is merely an example of how to write Unit Test for a component
 */

describe('src/components/common/notification/NotificationMessage.vue', () => {
  const localVue = createLocalVue()
  const vuetify = VuetifyInstance

  it('renders props.msg when passed', () => {
    const msg = 'Lorem ipsum sit amet'

    // NOTE: shallowMount() is the most common, because it renders components faster,
    // due the fact it will just load the component itself ignoring the child component.
    // The rule of thumb is to use shallowMount()
    // But there cases that we need to render the whole component to check something

    const wrapper = mount(NotificationMessage, {
      localVue,
      vuetify,

      slots: { default: msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })
})
