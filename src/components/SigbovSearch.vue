<template>
  <div class="q-pt-md q-pb-md">
    <q-card flat>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col">
            <q-option-group
              class="q-pt-sm"
              v-model="filter"
              :options="options"
              color="primary"
              inline
              dense
            />
          </div>

          <q-page-sticky
            style="z-index: 1000"
            v-if="$q.screen.xs"
            :offset="[18, 18]"
            position="bottom-right"
          >
            <q-btn
              @click.stop="$emit('register')"
              fab
              color="primary"
              icon="mdi-table-plus"
            />
          </q-page-sticky>

          <div
            v-else
            class="col column items-end"
          >
            <q-btn
              :label="registerLabel"
              @click.stop="$emit('register')"
              class="btn-fixed-width"
              color="primary"
              icon="mdi-table-plus"
            />
          </div>

          <div class="col-xs-12">
            <q-tab-panels v-model="filter">
              <q-tab-panel name="search" class="q-pa-none">
                <slot name="filter" />
              </q-tab-panel>
              <q-tab-panel name="more_filters" class="q-pa-none">
                <slot name="more-filters" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="q-ml-sm">
        <q-btn
          @click.stop="$emit('search')"
          color="primary"
          class="btn-fixed-width"
          label="Pesquisar"
          dense
          icon="mdi-magnify"
          style="width: 130px"
        />

        <q-btn
          color="primary"
          label="Mais Opções"
          dense
          outline
          icon="mdi-dots-vertical"
          style="width: 130px"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ComponentSigbovSearch',

  data () {
    return {
      filter: 'search',
      options: [
        {
          label: 'Pesquisa',
          value: 'search'
        },
        {
          label: 'Filtros Adicionais',
          value: 'more_filters',
          disable: !this.moreFilters
        }
      ]
    }
  },

  props: {
    moreFilters: {
      default: false,
      type: Boolean
    },
    registerLabel: {
      default: 'Novo Registro',
      type: String
    }
  }
}
</script>
