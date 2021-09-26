<template lang="pug">
.quote-pack(fluid)
  v-tabs(v-model="stage")
    v-tab(v-for="s in stages" :key="s.key")
      template(#default) 
        span {{ s.label }}
  v-tabs-items(v-model="stage")
    v-tab-item(v-for="s in stages" :key="s.key")
      component(v-if="s.key === stage && s.component" :is="s.component")
      h2(v-else class="text-center pt-12") No data yet
</template>

<script>
import { InfoUpload } from '@/components/QuotePack'
import { ThreeDF } from '@/components/QuotePack'

export default {
  name: 'QuotePack',
  components: {
    InfoUpload,
    ThreeDF
  },
  data() {
    const stages = [
      {
        key: 0,
        label: 'Information Uploads (Open)',
        component: 'InfoUpload'
      },
      {
        key: 1,
        label: '3DF (In Progress)',
        component: 'ThreeDF'
      },
      {
        key: 2,
        label: 'Quotes'
      }
    ]

    return {
      stage: 0,
      stages
    }
  },
  methods: {
    handleChangeStage(stage) {
      this.stage = stage
    }
  }
}
</script>

<style lang="scss" scoped>
.quote-pack {
  padding-right: 5px;

  ::v-deep {
    .v-tab {
      text-transform: unset;
    }

    .v-tabs {
      height: 48px;
    }
  }
}
</style>
