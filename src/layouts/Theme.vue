<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary-gradient">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>SIGBOV</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-card flat square>
          <q-card-actions>
            <q-select
              v-model="session.farm_id"
              :options="optionFarms.farms"
              bg-color="grey-2"
              dense
              filled
              label="Fazenda Selecionada"
              map-options
              options-dense
              option-label="description"
              option-value="id"
              style="width: 100%"
              square
            />
          </q-card-actions>
        </q-card>

        <q-separator />

        <q-list class="text-grey-8" dense>
          <q-item-label header class="text-weight-bold">
            Pecuária
          </q-item-label>
          <q-item
            v-for="link in livestock"
            v-ripple
            :active="$router.currentRoute.matched.length > 0 && link.url === $router.currentRoute.matched[$router.currentRoute.matched.length - 1].path"
            active-class="my-menu-link"
            :key="link.url"
            :to="link.url"
            clickable
          >
            <q-item-section avatar>
              <q-avatar size="md" rounded color="white" text-color="primary" :icon="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold">
            Manejos
          </q-item-label>

          <q-item
            v-for="link in management"
            v-ripple
            :active="$router.currentRoute.matched.length > 0 && link.url === $router.currentRoute.matched[$router.currentRoute.matched.length - 1].path"
            active-class="my-menu-link"
            :key="link.url"
            :to="link.url"
            clickable
          >
            <q-item-section avatar>
              <q-avatar size="md" rounded color="white" text-color="primary" :icon="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold">
            Estoque
          </q-item-label>

          <q-item
            v-for="link in stock"
            v-ripple
            :active="$router.currentRoute.matched.length > 0 && link.url === $router.currentRoute.matched[$router.currentRoute.matched.length - 1].path"
            :key="link.text"
            :to="link.url"
            clickable
          >
            <q-item-section avatar>
              <q-avatar size="md" rounded color="white" text-color="primary" :icon="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold">
            Financeiro
          </q-item-label>

          <q-item
            v-for="link in financial"
            v-ripple
            :active="$router.currentRoute.matched.length > 0 && link.url === $router.currentRoute.matched[$router.currentRoute.matched.length - 1].path"
            :key="link.text"
            :to="link.url"
            clickable
          >
            <q-item-section avatar>
              <q-avatar size="md" rounded color="white" text-color="primary" :icon="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold">
            Conta
          </q-item-label>

          <q-item
            v-for="link in account"
            v-ripple
            :key="link.text"
            :to="link.url"
            clickable
          >
            <q-item-section avatar>
              <q-avatar size="md" rounded color="white" text-color="primary" :icon="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LayoutTheme',

  async created () {
    await this.farms()
  },

  computed: {
    ...mapState('app', [
      'session'
    ]),

    ...mapState('farm', {
      optionFarms: 'table'
    })
  },

  data () {
    return {
      leftDrawerOpen: false,
      livestock: [
        { icon: 'fas fa-tachometer-alt', text: 'Início', url: '/home' },
        { icon: 'fas fa-warehouse', text: 'Fazendas', url: '/farm' },
        { icon: 'fas fa-map-marker-alt', text: 'Pastos', url: '/pasture' },
        { icon: 'fas fa-tags', text: 'Lotes', url: '/lot' },
        { icon: 'fas fa-tag', text: 'Animais', url: '/animal' }
      ],
      management: [
        { icon: 'fa fa-balance-scale', text: 'Pesagens', url: '/managment/weighing' },
        { icon: 'fas fa-exchange-alt', text: 'Transferências', url: '/management/transfer' },
        { icon: 'fas fa-syringe', text: 'Sanitários', url: '/management/sanitary' },
        { icon: 'fas fa-crutch', text: 'Reproduções', url: '/management/reproduction' },
        { icon: 'fas fa-utensils', text: 'Engorda', url: '/management' }
      ],
      stock: [
        { icon: 'fas fa-boxes', text: 'Produtos', url: '/' },
        { icon: 'fas fa-file-alt', text: 'Documentos Fiscais', url: '/' },
        { icon: 'fas fa-archive', text: 'Armazéns', url: '/' },
        { icon: 'fas fa-dolly-flatbed', text: 'Inventário', url: '/' }
      ],
      financial: [
        { icon: 'fa fa-cash-register', text: 'Aquisição e Venda de Animais', url: '/' },
        { icon: 'fas fa-file-invoice-dollar', text: 'Movimentações', url: '/' },
        { icon: 'fas fa-calculator', text: 'Simulador de Vendas', url: '/' },
        { icon: 'fas fa-book', text: 'Livro Caixa', url: '/' }
      ],
      account: [
        { icon: 'fa fa-user-circle', text: 'Meus Dados', url: '/' },
        { icon: 'fas fa-users', text: 'Gerenciar Usuários', url: '/' },
        { icon: 'fas fa-file-invoice', text: 'Faturas', url: '/' },
        { icon: 'fas fa-headset', text: 'Chamados', url: '/' }
      ]
    }
  },

  methods: {
    ...mapActions('farm', {
      farms: 'find'
    })
  }
}
</script>

<style scoped>
  .q-avatar {
    height: 30px !important;
    width: 30px !important;
  }

.my-menu-link {
  color: white;
  background: #ff9800;
}
</style>
