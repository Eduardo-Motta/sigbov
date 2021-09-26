<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <sigbov-search
      :register-label="'Cadastrar Novo Animal'"
      @register="register"
      @search="getAnimals"
    >
      <template v-slot:filter>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              v-model="filters.earring"
              @keyup.enter="getAnimals"
              dense
              filled
              label="Brinco"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              v-model="filters.rfid_code"
              @keyup.enter="getAnimals"
              dense
              filled
              label="Código RFID"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              v-model="filters.lot"
              @keyup.enter="getAnimals"
              dense
              filled
              label="Lote"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              v-model="filters.pasture"
              @keyup.enter="getAnimals"
              dense
              filled
              label="Pasto"
            />
          </div>
        </div>
      </template>

      <template v-slot:more-filters>

      </template>
    </sigbov-search>

    <sigbov-table
      :columns="table._columns"
      :data="table.animals"
      :pagination="table._pagination"
      @selected="getSelectedAnimal($event)"
    />
    <sigbov-form v-if="animal.action" />
  </sigbov-page>
</template>

<script>
import SigbovForm from './Form.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { SigbovForm },
  name: 'PageAnimalIndex',

  async created () {
    const breeds = (await this.getBreeds()).breeds
    this.options.breeds = breeds

    const lots = (await this.optionLots()).lots
    this.options.lots = lots

    await this.getAnimals()
  },

  computed: {
    ...mapState('animal', [
      'animal',
      'table'
    ])
  },

  data () {
    return {
      filters: { },
      options: {
        breeds: [],
        lots: []
      },
      page: {
        icon: 'mdi-cow',
        title: 'Animais',
        subtitle: 'Gerencie os animais da fazenda'
      }
    }
  },

  sockets: {
    animal_find: function (data) {
      let records = this.table.animals
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

      this.setAnimals(records)
    }
  },

  methods: {
    ...mapActions('animal', [
      'find',
      'findById',
      'getWeighings'
    ]),

    ...mapActions('breed', [
      'getBreeds'
    ]),

    ...mapActions('lot', {
      optionLots: 'find'
    }),

    ...mapMutations('animal', [
      'setAnimals',
      'setAction',
      'setDialog',
      'updateRow'
    ]),

    async getAnimals () {
      await this.find(this.filters)
    },

    async getSelectedAnimal (id) {
      await this.findById(id)
      await this.getWeighings(id)
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
