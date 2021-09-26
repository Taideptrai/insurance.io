<template lang="pug">
.project-detail(fluid class="d-flex flex-column py-0")
  DefaultLoading(v-if="project.loading")
  template(v-if="!project.loading")
    v-tabs.step(v-model="tab" @change="onTabChange")
      v-tab(v-for="s in stages" :key="s.key" :ripple="false")
        v-card.step-item(:class="{ 'is-complete': s.status }" outlined)
          .tab-badge(v-if="s.status") 
            span.tab-badge-content STEP READY
          div(:class="`bg-tab bg-tab-${getCodeProject(s.label)}`")
          v-card-text
            component(:is="s.icon")
            v-chip.mb-1(color="white" small v-if="s.currentState") {{ s.currentState }}
            h3.tab-title {{ s.label }}

    v-tabs-items.flex-grow-1(v-model="tabItem")
      v-tab-item(v-for="s in stages" :key="s.key")
        template(v-if="s.key === tabItem && s.component")
          component(:is="s.component" @modified="handleModified" :project="project")
        h2.text-center.pt-12(v-else) No data yet
</template>

<script>
import { ProjectSetup, QuotePack } from './tabs'
import { DefaultLoading } from '@/components/common/loading'

import { mapGetters } from 'vuex'
import { toastedError } from '@/core/helpers/toasted'
import { unsavedDialog } from '@/core/helpers/dialog'

export default {
  name: 'ProjectDetail',
  components: {
    DefaultLoading,
    QuotePack,
    ProjectSetup
  },
  data() {
    return {
      isModifiedProjectsetup: false,
      tab: 0,
      tabItem: 0
    }
  },
  computed: {
    ...mapGetters('project', ['quotepackStage', 'project']),
    stages() {
      return [
        {
          key: 0,
          label: 'Project Setup',
          status: 'completed',
          currentState: 'Open',
          icon: '',
          component: 'ProjectSetup'
        },
        {
          key: 1,
          label: 'Quote Pack',
          icon: '',
          component: 'QuotePack',
          ...this.quotepackStageData
        },
        {
          key: 2,
          label: 'Binder Pack',
          currentState: '',
          status: '',
          icon: ''
        },
        {
          key: 3,
          label: 'Signing & Completion',
          currentState: '',
          status: '',
          icon: ''
        }
      ]
    },
    quotepackStageData() {
      return {
        currentState: this.quotepackStage?.status?.label
      }
    },
    breadCrumbItems() {
      return [
        {
          text: 'My Projects',
          disabled: false,
          href: '/project'
        }
      ]
    }
  },
  watch: {
    project: {
      deep: true,
      handler() {
        if (!this.project.loading && this.project.data === null) {
          toastedError(this.$t('error.project-not-found'))
          this.$router.push({ name: 'home' })
        }
        if (!this.project.loading && this.project.data !== null) {
          this.$store.dispatch('setTitle', this.project.data.name)
          this.$store.dispatch('setBackRouter', {
            title: 'My projects',
            router: { name: 'home' }
          })
        }
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.$store.dispatch('project/getProjectDetail', id)
  },
  methods: {
    handleModified(status) {
      this.isModifiedProjectsetup = status
    },
    async onTabChange(clickedTab) {
      await this.$nextTick()
      this.tab = this.tabItem
      if (this.tabItem === 0 && this.isModifiedProjectsetup) {
        unsavedDialog(this).then(status => {
          if (status === undefined) {
            status = false
          }
          if (status) {
            this.isModifiedProjectsetup = false
            this.tab = this.tabItem = clickedTab
          }
        })
      } else {
        this.tabItem = this.tab = clickedTab
      }
    },
    getCodeProject(label) {
      if (label.includes('&')) label = label.replaceAll('&', 'and')
      return label.toLowerCase().replaceAll(' ', '_')
    }
  }
}
</script>

<style lang="scss" scoped>
$item-margin-right: 20px;
$color-tab-default: #bfbfbf;
$bg-color-tab-default: #fafafa;

.project-detail {
  ::v-deep {
    .v-tabs-items {
      position: sticky;
      top: 0;

      .v-tab {
        margin-right: 32px;

        span {
          color: $color-dark;
          font-size: rem(16px);
        }

        &.v-tab--active {
          span {
            color: $color-primary;
          }
        }
      }
    }

    .v-breadcrumbs__divider.v-breadcrumbs__divider {
      padding: 0;
    }

    .v-item-group,
    .v-item-group .v-window__container,
    .v-item-group .v-window__container .v-window-item,
    .v-item-group .v-window__container .v-window-item .container {
      height: 100%;

      .v-tabs-items {
        height: calc(100% - 48px);
      }
    }

    .v-tabs-bar {
      .v-slide-group__wrapper {
        padding: 10px 0;
      }

      .v-tabs-slider-wrapper {
        bottom: -7px;
      }

      .v-tab {
        padding: 0;
        text-transform: unset;
      }
    }
  }

  .tab-badge {
    position: absolute;
    top: -10px;
    left: 16px;

    &-content {
      position: relative;
      padding: 4px 8px;
      color: $color-white;
      font-size: 10px;
      background-color: $color-success;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;

      &:after {
        position: absolute;
        top: 0;
        right: -6px;
        width: 6px;
        height: 10px;
        text-transform: uppercase;
        border-top: 5px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 5px solid #0aa252;
        border-left: 3px solid #0aa252;
        content: '';
      }
    }
  }

  .bg-tab {
    height: 100%;
    background-position: 90px 24px;
  }

  .bg-tab-project_setup {
    background-image: url('~@/assets/img/tabImages/tab-image-setup-default.svg');
  }

  .bg-tab-quote_pack {
    background-image: url('~@/assets/img/tabImages/tab-image-quote-default.svg');
  }

  .bg-tab-binder_pack {
    background-image: url('~@/assets/img/tabImages/tab-image-binder-default.svg');
  }

  .bg-tab-signing_and_completion {
    background-image: url('~@/assets/img/tabImages/tab-image-sign&comp-default.svg');
  }

  .step {
    ::v-deep {
      .v-tabs-bar {
        .v-tabs-slider-wrapper {
          display: none;
        }

        .v-tab {
          .step-item {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 195px;
            height: 173px;
            margin-right: $item-margin-right;
            text-align: left;
            background-color: $bg-color-tab-default;

            &.v-sheet--outlined {
              border: none;
            }
          }

          &:before {
            right: $item-margin-right;
          }

          & .v-card__text {
            padding-right: 0;
            font-weight: 100;
            font-family: 'Space Grotesk', sans-serif;
          }

          &:not(.v-tab--active) {
            & .v-card__text {
              h3 {
                color: $color-tab-default;
                font-size: rem(16px);
              }
            }
          }

          &:not(.v-tab--active) .is-complete {
            background: transparent linear-gradient(229deg, #fff 0%, #dedede1c 17%, #808080 100%) 0% 0% no-repeat;

            & .v-card__text {
              h3 {
                color: $color-dark;
                font-size: rem(16px);
              }
            }
          }

          &.v-tab--active {
            .step-item {
              background-color: $color-primary;

              .v-card__text {
                color: #fff;
              }
            }

            .bg-tab-project_setup {
              background-image: url('~@/assets/img/tabImages/tab-image-setup-active.svg');
            }

            .bg-tab-quote_pack {
              background-image: url('~@/assets/img/tabImages/tab-image-quote-active.svg');
            }

            .bg-tab-binder_pack {
              background-image: url('~@/assets/img/tabImages/tab-image-binder-active.svg');
            }

            .bg-tab-signing_and_completion {
              background-image: url('~@/assets/img/tabImages/tab-image-sign&comp-active.svg');
            }

            .bg-tab {
              background-position: 90px 24px;
            }
          }
        }

        .v-chip {
          padding: 4px 8px;
        }
      }
    }
  }
}
</style>
