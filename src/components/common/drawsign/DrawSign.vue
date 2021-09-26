<template lang="pug">
v-card.sign-modal
  v-card-title.pb-6
    span.sign-modal--title.darkgrey-1--text Draw your signature
    v-spacer
    v-icon.sign-modal--btn-close(color="darkgrey-1" width="28px" @click.prevent="handleClose") close
  v-card-text
    VueSignaturePad.sign-pad(width="100%" height="180px" ref="signaturePad" :options="signPadOptions")
    .sign-pad--button
      v-spacer
      span.sign-pad--button__text.accent--text.cursor(@click.prevent="handleClearSign") CLEAR
    alert-inline(
      type="info"
      text="By signing the document with an electronic signature, I agree that such signature will be valid as handwritten signatures to the extent allowed by local law."
    )
    span.d-block.sign-modal--title.darkgrey-1--text Sign as
    .sign-detail-content.hide-scrollbar(v-dragscroll)
      .item.detail.cursor(
        :class="`${selectedIndex === index ? 'selected' : ''}`"
        :key="index"
        @click.prevent="handleSelect(index)"
        v-for="(item, index) in details"
      )
        .name-content.mb-1
          span.name.accent--text.mr-2 {{ item.name }}
          v-icon.cursor(color="darkgrey-1" size="14px" @click.prevent="handleEdit(index)") edit
        p.mb-4 {{ item.title }}
        p.name {{ item.companyName }}
        p {{ item.companyAddress }}
        p {{ item.city }}
        p.text-capitalize {{ item.country }}
        p {{ item.abn }}
      .item.add.cursor(@click.prevent="handleShowDetailForm")
        v-icon(color="darkgrey-1" size="40px") add
        span.drarkgrey-1--text Add signature details
  v-card-actions.pb-6
    v-spacer
    v-btn.cancel(color="darkgrey-1" min-height="48px" text @click.prevent="handleClose") cancel
    v-btn.btn-confirm.ml-4(
      :class="`${canSubmit ? '' : 'disabled'}`"
      color="accent"
      min-height="48px"
      min-width="218px"
      @click.prevent="handleConfirm"
    ) confirm signature
  v-dialog(v-model="isShowDialog" persistent max-width="512px")
    sign-detail-form(
      :init-data="initData"
      @sign-detail:close="handleCloseForm"
      @sign-detail:save="handleSave"
      v-if="isShowDialog"
    )
</template>
<script>
import { AlertInline } from '@/components/common/notification'
import SignDetailForm from './SignDetailForm'

export default {
  name: 'DrawSign',
  components: {
    AlertInline,
    SignDetailForm
  },
  data() {
    return {
      isDrawed: false,
      index: -1,
      initData: null,
      isShowDialog: false,
      details: [],
      selectedIndex: -1,
      signPadOptions: {
        penColor: '#323232',
        onBegin: () => {
          this.$refs.signaturePad.resizeCanvas()
        },
        onEnd: () => {
          this.isDrawed = !this.$refs.signaturePad.isEmpty()
        }
      }
    }
  },
  computed: {
    canSubmit() {
      return this.isDrawed && this.selectedIndex > -1
    }
  },
  methods: {
    handleSelect(index) {
      this.selectedIndex = index
    },
    handleConfirm() {
      if (this.canSubmit) {
        const { data, isEmpty } = this.$refs.signaturePad.saveSignature()
        if (!isEmpty) {
          this.$emit('draw:confirm', { detail: this.details[this.selectedIndex], sign: data })
        }
      }
    },
    handleEdit(index) {
      this.index = index
      this.initData = this.details[index]
      this.isShowDialog = true
    },
    handleSave(data) {
      if (this.index > -1) {
        this.details[this.index] = { ...data }
      } else {
        this.details.push({ ...data })
        if (this.selectedIndex < 0) {
          this.selectedIndex = 0
        }
      }
      this.handleCloseForm()
    },
    handleCloseForm() {
      this.isShowDialog = false
      this.initData = null
      this.index = -1
    },
    handleShowDetailForm() {
      this.isShowDialog = true
    },
    handleClearSign() {
      this.$refs.signaturePad.clearSignature()
      this.isDrawed = false
    },
    handleClose() {
      this.$emit('draw:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-modal {
  .sign-detail-content {
    display: flex;
    overflow-x: auto;

    .item {
      display: inline-block;
      flex: 0 0 360px;
      width: 360px;
      min-height: 172px;
      margin-right: 16px;
      padding: 16px;
      border: 1px solid #dedede;
      border-radius: 8px;

      &:last-child {
        margin-right: 0;
      }

      &.add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          margin-top: 5px;
        }
      }

      &.detail {
        &.selected {
          border: 2px solid $color-accent;
        }

        p {
          margin-bottom: 4px;
          overflow: hidden;
          color: $color-dark-grey-1;
          font-size: 12px;
          line-height: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .name {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
        }

        .name-content {
          display: flex;

          span {
            flex-grow: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  &--title {
    margin: 24px 0;
    font-weight: 600;
    font-size: 24px;

    &:first-child {
      margin: 0;
    }
  }
}

.sign-pad {
  background-color: $color-light-grey;

  &--button {
    display: flex;

    &__text {
      margin: 16px 0;
      font-size: 14px;
      line-height: 17px;
    }
  }
}

@media (max-width: 405px) {
  .btn-confirm {
    min-width: auto !important;
  }

  .sign-modal {
    &--title {
      font-size: 20px;
    }

    &--btn-close {
      font-size: 20px !important;
    }
  }
}
</style>
