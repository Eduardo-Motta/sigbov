<template>
  <div>
    <sigbov-dialog
      :padding-content="0"
      :value="animal.dialog"
    >
      <template v-slot:content>
        <q-tabs
          v-if="animal.action === 'update'"
          v-model="tab"
          active-color="primary"
          align="left"
          class="text-blue-grey"
          inline-label
        >
          <q-tab name="animal" icon="mdi-cow" label="Animal" />
          <q-tab name="genealogy" icon="mdi-file-tree" label="Genealogia" />
          <q-tab name="transfer" icon="mdi-transfer" label="Transferências" />
          <q-tab name="weighing" icon="mdi-scale-balance" label="Pesagem" />
          <q-tab name="sanitary" icon="mdi-needle" label="Sanitário" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="animal">
            <q-form ref="form">
              <div class="row q-col-gutter-md">
                <div
                  v-if="animal.action === 'create'"
                  class="col-xs-12"
                >
                  <q-card-section class="q-pa-none">
                    <div class="text-subtitle2">Animal</div>
                  </q-card-section>

                  <q-separator />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-input
                    v-model="form.earring"
                    :rules="[
                      $rules.required('Brinco não informado.'),
                      $rules.maxLength(50, 'Brinco deve ter no máximo 50 caracteres.')
                    ]"
                    dense
                    filled
                    label="Brinco"
                    lazy-rules
                  />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-input
                    v-model="form.rfid_code"
                    :rules="[
                      $rules.maxLength(50, 'Código RFID deve ter no máximo 50 caracteres.')
                    ]"
                    dense
                    filled
                    label="Código RFID"
                    lazy-rules
                  />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-select
                    ref="sex"
                    v-model="form.sex"
                    :options="[
                      {
                        value: 'F',
                        label: 'Fêmea'
                      },
                      {
                        value: 'M',
                        label: 'Macho'
                      },
                    ]"
                    :rules="[
                      $rules.required('Sexo não informado.')
                    ]"
                    dense
                    emit-value
                    filled
                    label="Sexo"
                    lazy-rules
                    map-options
                    options-dense
                    option-label="label"
                    option-value="value"
                  />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-select
                    ref="lot"
                    v-model="form.lot_id"
                    :options="options.lots"
                    :rules="[
                      $rules.required('Lote não informado.')
                    ]"
                    dense
                    emit-value
                    filled
                    label="Lote"
                    lazy-rules
                    map-options
                    options-dense
                    option-label="description"
                    option-value="id"
                  />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-select
                    ref="breed"
                    v-model="form.breed_id"
                    :options="options.breeds"
                    :rules="[
                      $rules.required('Raça não informada.')
                    ]"
                    dense
                    emit-value
                    filled
                    label="Raça"
                    lazy-rules
                    map-options
                    options-dense
                    option-label="description"
                    option-value="id"
                  />
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <q-input
                    v-model="form.name"
                    :rules="[
                      $rules.maxLength(100, 'Nome deve ter no máximo 50 caracteres.')
                    ]"
                    dense
                    filled
                    label="Nome"
                    lazy-rules
                  />
                </div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="genealogy">
            <div class="text-h6">Genealogia</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="transfer">
            <div class="text-h6">Transferências</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="weighing">
            <sigbov-table
              :columns="animal.weighings.columns"
              :data="animal.weighings.data"
            />
          </q-tab-panel>

          <q-tab-panel name="sanitary">
            <div class="text-h6">Sanitário</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </template>

      <template v-slot:actions>
        <q-btn
          v-if="animal.action === 'update'"
          @click="destroyDialog = true"
          class="q-ml-sm q-pr-xs"
          color="negative"
          icon="delete"
          label="Excluir"
        />

        <q-space />

        <q-btn
          v-if="animal.action === 'create' || animal.action === 'update' && tab === 'animal'"
          @click.stop="setMethod(animal.action, form)"
          color="primary"
          label="Salvar"
        />

        <q-btn
          @click.stop="closeDialog"
          flat
          label="Fechar"
        />
      </template>
    </sigbov-dialog>
    <q-dialog
      v-model="destroyDialog"
      persistent
    >
      <q-card style="width: 300px">
        <q-card-section class="q-pb-none">
          <div class="text-subtitle2">
            Atenção
          </div>
        </q-card-section>

        <q-separator class="q-mx-md" />

        <q-card-section>
          <p class="q-mb-sm">
            Para continuar, insira a palavra <b class="text-negative">excluir</b>.
          </p>

          <q-input
            v-model="destroyText"
            dense
            filled
            label="Palavra chave"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-white text-primary q-pt-sm q-pb-sm">
          <q-btn
            :disable="destroyText !== 'excluir'"
            @click="destroy()"
            class="q-px-xs"
            label="Confirmar"
            color="primary"
          />

          <q-btn
            @click.stop="closeDestroyDialog"
            flat
            label="Fechar"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const formDefault = {
  id: undefined,
  earring: '',
  rfid_code: '',
  sex: '',
  lot_id: '',
  breed_id: '',
  name: ''
}

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PageAnimalForm',

  data () {
    return {
      destroyDialog: false,
      destroyText: null,
      tab: 'animal',
      form: formDefault,
      options: {
        breeds: [],
        lots: []
      }
    }
  },

  computed: {
    ...mapState('animal', [
      'animal',
      'table'
    ])
  },

  async created () {
    const { action, form } = this.animal

    const breeds = (await this.getBreeds()).breeds
    this.options.breeds = breeds

    const lots = (await this.optionLots()).lots
    this.options.lots = lots

    if (action === 'create') this.form = formDefault
    else {
      const fields = {
        id: form.id,
        earring: form.earring,
        rfid_code: form.rfid_code,
        sex: form.sex,
        lot_id: form.lot_id,
        breed_id: form.breed_id,
        name: form.name
      }

      this.form = fields
    }
  },

  methods: {
    ...mapActions('animal', [
      'create',
      'update',
      'remove'
    ]),

    ...mapActions('breed', [
      'getBreeds'
    ]),

    ...mapActions('lot', {
      optionLots: 'find'
    }),

    ...mapMutations('animal', [
      'setAction',
      'setDialog',
      'setAnimal'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setAnimal(formDefault)
    },

    closeDestroyDialog () {
      this.destroyDialog = false
      this.destroyText = null
    },

    async setMethod (method, params) {
      this.$refs.breed.validate()
      this.$refs.lot.validate()
      this.$refs.sex.validate()

      const validate = await this.$refs.form.validate()

      if (validate) {
        await this[method](Object.assign(params, { farm_id: 1 }))
      }
    },

    async destroy () {
      if (this.animal.action === 'update' && this.tab === 'animal' && !!this.destroyDialog && this.destroyText === 'excluir') {
        const res = await this.remove(this.form.id)

        if (res.status) {
          this.destroyDialog = false
          this.destroyText = null
        }
      }
    }
  }
}
</script>
