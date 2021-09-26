<template>
  <sigbov-page
    :icon="page.icon"
    :title="page.title"
    :subtitle="page.subtitle"
  >
    <div class="q-pt-md q-pb-md">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-xs-12 col-md-6 col-lg-4">
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-xs-12">
                  <q-input
                    v-model="text"
                    clearable
                    filled
                    label-slot
                  >
                    <template v-slot:append>
                      <q-icon color="primary" name="search" />
                    </template>
                    <template v-slot:label>
                      Pesquisar animal pelo <b class="text-deep-orange">código RFID</b>
                      ou <b class="text-deep-orange">brinco</b>
                    </template>
                  </q-input>
                </div>
              </div>

              <q-separator class="q-mt-md q-mb-md" />

              <div class="row q-col-gutter-md">
                <div class="col-xs-6">
                  <q-input
                    dense
                    filled
                    label-slot
                    label="Código RFID"
                    disable
                  />
                </div>

                <div class="col-xs-6">
                  <q-input
                    dense
                    filled
                    label-slot
                    label="Brinco"
                    disable
                  />
                </div>

                <div class="col-xs-6">
                  <q-input
                    dense
                    filled
                    label-slot
                    label="Lote Atual"
                    disable
                  />
                </div>

                <div class="col-xs-6">
                  <q-input
                    dense
                    filled
                    label-slot
                    label="Peso Atual (kg)"
                    disable
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <q-btn color="primary" class="full-width" label="Finalizar Manejo" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-xs-12 col-md-6 col-lg-4">
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-xs-12">
                  <q-card-section class="q-pa-none">
                    <div class="text-subtitle2">Pesagem</div>
                  </q-card-section>

                  <q-separator />

                  <div class="row q-col-gutter-md q-pt-md">
                    <div class="col-xs-6">
                      <q-input
                        dense
                        filled
                        label-slot
                        label="Tipo de Pesagem"
                      />
                    </div>

                    <div class="col-xs-6">
                      <q-input
                        dense
                        filled
                        label-slot
                        label="Peso (kg)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-xs-12 col-md-6 col-lg-4">
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-xs-12">
                  <q-card-section class="q-pa-none">
                    <div class="text-subtitle2">Transferência</div>
                  </q-card-section>

                  <q-separator />

                  <div class="row q-col-gutter-md q-pt-md">
                    <div class="col-xs-6">
                      <q-input
                        dense
                        filled
                        label-slot
                        label="Tipo de Pesagem"
                      />
                    </div>

                    <div class="col-xs-6">
                      <q-input
                        dense
                        filled
                        label-slot
                        label="Peso (kg)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </sigbov-page>
</template>

<script>
export default {
  name: 'PageManagmentWeighingIndex',

  data () {
    return {
      text: '',
      filters: { },
      page: {
        icon: 'mdi-map',
        title: 'Manejos',
        subtitle: 'Pesagem de Animais'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .row + .row
    margin-top: 1rem
</style>
