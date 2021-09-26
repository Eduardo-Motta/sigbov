<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Novo Pasto'"
      @register="register"
      @search="getPastures"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-input
              v-model="filters.description"
              @keyup.enter="getPastures"
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
      :data="table.pastures"
      :pagination="table._pagination"
      @selected="getSelectedPasture($event)"
    />
    <sigbov-form v-if="pasture.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PagePastureIndex',

  async created () {
    await this.getPastures()
  },

  computed: {
    ...mapState('address', [
      'states'
    ]),

    ...mapState('pasture', [
      'pasture',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      page: {
        icon: 'mdi-map',
        title: 'Pastos',
        subtitle: 'Áreas da fazenda'
      }
    }
  },

  sockets: {
    pasture_find: function (data) {
      let records = this.table.pastures
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

      this.setPastures(records)
    }
  },

  methods: {
    ...mapActions('pasture', [
      'find',
      'findById'
    ]),

    ...mapMutations('pasture', [
      'setPastures',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getPastures () {
      await this.find(this.filters)
    },

    async getSelectedPasture (id) {
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
