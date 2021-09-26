<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Novo Lote'"
      @register="register"
      @search="getLots"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.description"
              @keyup.enter="getLots"
              dense
              filled
              label="Descrição"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.pasture"
              @keyup.enter="getLots"
              dense
              filled
              label="Pasto"
            />
          </div>
        </div>
      </template>
    </sigbov-search>

    <sigbov-table
      :columns="table._columns"
      :data="table.lots"
      :pagination="table._pagination"
      @selected="getSelectedLot($event)"
    />
    <sigbov-form v-if="lot.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PageLotIndex',

  async created () {
    await this.getLots()
  },

  computed: {
    ...mapState('lot', [
      'lot',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      page: {
        icon: 'mdi-tag',
        title: 'Lotes',
        subtitle: 'Lotes de animais'
      }
    }
  },

  sockets: {
    lot_find: function (data) {
      let records = this.table.lots
      const index = records.map(row => row.id).indexOf(data.id)

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

      this.setLots(records)
    }
  },

  methods: {
    ...mapActions('lot', [
      'find',
      'findById'
    ]),

    ...mapMutations('lot', [
      'setLots',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getLots () {
      await this.find(this.filters)
    },

    async getSelectedLot (id) {
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
