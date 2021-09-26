<template lang="pug">
v-card.sign-detail-form
  v-card-title.title
    v-icon.cursor(color="darkgrey-1" size="28px" @click.prevent="handleClose") arrow_back
    span.darkgrey-1--text {{ initData ? 'Edit' : 'New' }} signature details
  v-card-text
    v-form(v-model="isValid" ref="form")
      v-row
        v-col(cols="12")
          text-field(
            v-model="data.name"
            label="Full Name"
            name="name"
            :rules="rules"
            append-icon="check"
            hide-details="auto"
          )
        v-col(cols="12")
          text-field(
            v-model="data.title"
            label="Title"
            name="title"
            :rules="rules"
            append-icon="check"
            hide-details="auto"
          )
        v-col(cols="12")
          v-divider
        v-col(cols="12")
          text-field(
            v-model="data.companyName"
            label="Company Name"
            name="companyName"
            :rules="rules"
            append-icon="check"
            hide-details="auto"
          )
        v-col(cols="12")
          text-field(
            v-model="data.companyAddress"
            label="Company Address"
            name="companyAddress"
            :rules="rules"
            append-icon="check"
            hide-details="auto"
          )
        v-col(md="6" cols="12")
          text-field(
            v-model="data.city"
            label="City"
            name="city"
            :rules="rules"
            append-icon="check"
            hide-details="auto"
          )
        v-col(md="6" cols="12")
          v-select(
            v-model="data.country"
            :items="country"
            label="Country"
            color="accent"
            outlined
            :rules="rules"
            hide-details="auto"
            item-text="label"
            item-value="code"
          )
        v-col(md="6" cols="12")
          text-field(v-model="data.abn" label="ABN" name="abn" :rules="rules" append-icon="check" hide-details="auto")
  v-card-actions.pb-6
    v-spacer
    v-btn.mr-4(color="darkgery-1" min-height="48px" text dense @click.prevent="handleClose") cancel
    v-btn.ml-4(color="accent" min-height="48px" min-width="101px" dense @click.prevent="handleSave") SAVE
</template>

<script>
import { TextField } from '@/components/common/form/fields'
import { mapGetters } from 'vuex'

export default {
  name: 'SignDetailForm',
  components: {
    TextField
  },
  props: {
    initData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isValid: false,
      data: {},
      rules: [v => !!v || this.$t('error.validation.required')]
    }
  },
  computed: {
    ...mapGetters('project', ['country'])
  },
  created() {
    this.data = {
      name: this.initData?.name || '',
      title: this.initData?.title || '',
      companyName: this.initData?.companyName || '',
      companyAddress: this.initData?.companyAddress || '',
      city: this.initData?.city || '',
      country: this.initData?.country || '',
      abn: this.initData?.abn || ''
    }
  },
  methods: {
    handleSave() {
      this.$refs.form.validate()
      if (this.isValid) {
        this.$emit('sign-detail:save', this.data)
      }
    },
    handleClose() {
      this.$emit('sign-detail:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-detail-form {
  .title {
    padding-bottom: 38px;

    span {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}

@media (max-width: 405px) {
  .sign-detail-form {
    .title {
      span {
        font-size: 20px;
      }

      .v-icon {
        font-size: 20px !important;
      }
    }
  }
}
</style>
