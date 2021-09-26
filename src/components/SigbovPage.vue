<template>
  <q-page class="bg-grey-1">
    <q-card flat square>
      <q-item class="bg-grey-1 text-dark q-pa-none q-pt-sm q-pl-md">
        <q-item-section avatar>
          <q-avatar square>
            <q-icon :name="icon" class="text-primary" size="32px" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <div class="text-h6">{{title}}</div>
          <div class="text-subtitle2">{{subtitle}}</div>
        </q-item-section>
      </q-item>
    </q-card>

    <div class="q-pa-md">
      <q-separator />
      <slot />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ComponentSigbovPage',

  props: {
    icon: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    subtitle: {
      required: true,
      type: String
    }
  }
}
</script>
