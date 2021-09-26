<template lang="pug">
.project(class="cursor")
  .highlight(class="v-application accent text-decoration-none" @click.prevent="handleDetail")
    v-icon.material-icons-outlined(size="40px" color="twilight") search
    span.text-uppercase.twilight--text.mt-2 open project
  .name(:class="`bg-project-${stage.code} bg-color-${getStageColor}`")
    span.white--text {{ project.name }}
  .info-content
    .list-filter
      v-chip(class="white--text" :color="getStageColor" small) {{ stage.label }}
      v-chip(outlined :color="getStageColor" class="ml-2" small) {{ project.quotepackStage.status.label }}
    .user.mt-5
      v-icon.material-icons-outlined(size="16px") account_circle
      span.ml-2(class="darkgrey-1--text") I'm the	&nbsp;
        b {{ project.creatorRole.label }}
    .last-update.mt-4
      span.darkgrey-1--text Last update on {{ project.updatedAt | formatDate }}
</template>

<script>
import { formatDate } from '@/core/helpers/mixins'
import { getColorFromStage } from '@/core/helpers/project'

export default {
  name: 'ProjectCard',
  mixins: [formatDate],
  props: {
    project: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // project_setup, quote_pack, binder_pack, signing_and_completion
      stage: {
        code: 'project_setup',
        label: 'Project Setup'
      }
    }
  },
  computed: {
    getStageColor() {
      return getColorFromStage(this.stage.code)
    }
  },
  watch: {
    project: {
      deep: true,
      handler() {
        this.checkStage()
      }
    }
  },
  created() {
    this.checkStage()
  },
  methods: {
    checkStage() {
      if (this.project?.quotepackStage) {
        this.stage = {
          code: 'quote_pack',
          label: 'Quote Pack'
        }
        return
      }
      if (this.project?.binderPackStage) {
        this.stage = {
          code: 'binder_pack',
          label: 'Binder Pack'
        }
        return
      }
      if (this.project?.signingAndCompletion) {
        this.stage = {
          code: 'signing_and_completion',
          label: 'Signing and Completion'
        }
        return
      }
      this.stage = {
        code: 'project_setup',
        label: 'Project Setup'
      }
    },
    handleDetail() {
      this.$store.dispatch('setTitle', this.project.name)
      this.$store.dispatch('setBackRouter', {
        title: 'My projects',
        router: { name: 'home' }
      })
      this.$router.push({ name: 'project.detail', params: { id: this.project.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  border: 1px solid #dedede;
  border-radius: 8px;

  .highlight {
    position: absolute;
    z-index: 1;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    opacity: 90%;

    span {
      font-size: 20px;
      letter-spacing: 1.28px;
    }
  }

  &:hover {
    .highlight {
      display: flex;
    }
  }

  .name {
    display: flex;
    align-items: flex-end;
    height: 160px;
    padding: 22px 24px;
    background-repeat: no-repeat;
    background-position: calc(100% - 22px) 14px;
    border-radius: 8px 8px 0 0;

    span {
      font-size: 24px;
    }
  }

  .info-content {
    padding: 24px;
    padding-top: 16px;
    background: #fff;
    border-radius: 0 0 8px 8px;

    .user {
      display: flex;
      align-items: center;

      span {
        line-height: 17px;
        letter-spacing: 0;
      }
    }

    .last-update {
      font-size: 10px;
    }
  }
}
</style>
