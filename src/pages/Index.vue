<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <div class="row">
      <div class="col-xs-3">
        <sigbov-table
          :columns="animalBreed._columns"
          :data="animalBreed.data"
        />
      </div>
     <div class="col-xs-4">
        <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
  </sigbov-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageHome',

  async created () {
    await this.find()
  },

  computed: {
    ...mapState('home', [
      'animalBreed'
    ])
  },

  data () {
    return {
      chartOptions: {
        labels: ['Blue', 'Green']
      },
      series: [11, 32],
      page: {
        icon: 'fas fa-tachometer-alt',
        title: 'Início',
        subtitle: 'Informações da Fazenda'
      }
    }
  },

  methods: {
    ...mapActions('home', [
      'find'
    ])
  }
}
</script>
