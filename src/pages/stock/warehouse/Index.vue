<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Novo Armazém'"
      @register="register"
      @search="getWarehouses"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.description"
              @keyup.enter="getWarehouses"
              dense
              filled
              label="Descrição"
            />
          </div>
        </div>
      </template>
    </sigbov-search>

    <sigbov-table
      :columns="table._columns"
      :data="table.warehouses"
      :pagination="table._pagination"
      @selected="getSelectedWarehouse($event)"
    />
    <sigbov-form v-if="warehouse.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PageStockWarehouseIndex',

  async created () {
    await this.getWarehouses()
  },

  computed: {
    ...mapState('stockWarehouse', [
      'warehouse',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      page: {
        icon: 'fas fa-archive',
        title: 'Armazém',
        subtitle: 'Depósitos da fazenda'
      }
    }
  },

  sockets: {
    warehouse_find: function (data) {
      let records = this.table.warehouses
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

      this.setWarehouses(records)
    }
  },

  methods: {
    ...mapActions('stockWarehouse', [
      'find',
      'findById'
    ]),

    ...mapMutations('stockWarehouse', [
      'setWarehouses',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getWarehouses () {
      await this.find(this.filters)
    },

    async getSelectedWarehouse (id) {
      await this.findById(id)
    },

    register () {
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
