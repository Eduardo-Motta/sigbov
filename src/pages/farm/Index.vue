<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Nova Fazenda'"
      @register="register"
      @search="getFarms"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.description"
              @keyup.enter="getFarms"
              dense
              filled
              label="Descrição"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-select
              v-model="filters.management_type"
              :options="options.management_types"
              @input="getFarms"
              class="ellipsis"
              clearable
              dense
              emit-value
              filled
              label="Tipo de Gestão"
              map-options
              options-dense
              option-label="description"
              option-value="value"
            />
          </div>
        </div>
      </template>
    </sigbov-search>

    <sigbov-table
      :columns="table._columns"
      :data="table.farms"
      :pagination="table._pagination"
      @selected="getSelectedFarm($event)"
    />

    <sigbov-form v-if="farm.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PageFarmIndex',

  async created () {
    await this.getFarms()

    // Tipo de Gestão
    const managementTypes = await this.getOptions(4)
    this.options.management_types = managementTypes.options
  },

  computed: {
    ...mapState('address', [
      'states'
    ]),

    ...mapState('farm', [
      'farm',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      options: {
        management_types: []
      },
      page: {
        icon: 'mdi-warehouse',
        title: 'Fazendas',
        subtitle: 'Gerencie suas propriedades'
      }
    }
  },

  sockets: {
    farm_find: function (data) {
      console.log(data)
      let records = this.table.farms
      const index = records.map(card => card.id).indexOf(data.id)

      if (data.event === 'create') {
        if (index === -1) {
          records = [...records, data]
        }
      } else if (data.event === 'update') {
        this.$nextTick(() => {
          if (index !== -1) {
            this.updateRow({
              index: index,
              data: data
            })
          }
        })
      } else {
        if (index !== -1) {
          records.splice(index, 1)
        }
      }

      this.setFarms(records)
    }
  },

  methods: {
    ...mapActions('farm', [
      'find',
      'findById'
    ]),

    ...mapActions('option', [
      'getOptions'
    ]),

    ...mapMutations('farm', [
      'setFarms',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getFarms () {
      await this.find(this.filters)
    },

    async getSelectedFarm (id) {
      await this.findById(id)
    },

    register (id) {
      try {
        this.setAction('create')
        this.setDialog(true)
      } catch {
        this.setAction('')
        this.setDialog(false)
      }
    }
  }
}
</script>
