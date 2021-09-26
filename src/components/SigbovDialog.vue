<template>
  <q-dialog
    v-model="value"
    persistent
  >
    <q-card
      class="bg-primary"
      :style="`width: ${size}px; max-width: 90vw;`"
    >
      <q-card-section
        class="bg-white scroll"
        :style="`max-height: 80vh; padding: ${paddingContent}px`"
      >
        <slot name="content" />
      </q-card-section>

      <q-separator class="bg-grey-3" />

      <q-card-actions align="right" class="bg-white text-primary q-pt-sm q-pb-sm">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ComponentSigbovDialog',

  props: {
    paddingContent: {
      default: 16,
      type: Number
    },
    size: {
      default: 900,
      type: Number
    },
    title: {
      required: false,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    }
  }
}
</script>
