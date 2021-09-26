<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Novo Grupo de Produto'"
      @register="register"
      @search="getProductsGroup"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.description"
              @keyup.enter="getProductsGroup"
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
      :data="table.productsGroup"
      :pagination="table._pagination"
      @selected="getSelectedProductGroup($event)"
    />
    <sigbov-form v-if="productGroup.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PageStockProductGroupIndex',

  async created () {
    await this.getProductsGroup()
  },

  computed: {
    ...mapState('stockProductGroup', [
      'productGroup',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      page: {
        icon: 'fas fa-boxes',
        title: 'Grupo de Produtos',
        subtitle: 'Agrupamento de produtos com a mesma regra de tributação'
      }
    }
  },

  sockets: {
    product_group_find: function (data) {
      let records = this.table.productsGroup
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

      this.setProductsGroup(records)
    }
  },

  methods: {
    ...mapActions('stockProductGroup', [
      'find',
      'findById'
    ]),

    ...mapMutations('stockProductGroup', [
      'setProductsGroup',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getProductsGroup () {
      await this.find(this.filters)
    },

    async getSelectedProductGroup (id) {
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
