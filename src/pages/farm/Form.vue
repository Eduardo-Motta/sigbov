<template>
  <div>
    <sigbov-dialog
      :value="farm.dialog"
    >
      <template v-slot:content>
        <q-form ref="form">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12">
              <q-card-section class="q-pa-none">
                <div class="text-subtitle2">Fazenda</div>
              </q-card-section>

              <q-separator />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8">
              <q-input
                v-model="form.description"
              :rules="[
                  $rules.required('Descrição não informada.'),
                  $rules.maxLength(100, 'Descrição deve ter no máximo 100 caracteres.')
                ]"
                dense
                filled
                label="Descrição"
                lazy-rules
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-select
                ref="management_type"
                v-model="form.management_type"
                :options="options.management_types"
                :rules="[
                  $rules.required('Tipo de Gestão não informada.')
                ]"
                dense
                emit-value
                filled
                label="Tipo de Gestão"
                lazy-rules
                map-options
                options-dense
                option-label="description"
                option-value="value"
              />
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4">
              <q-input
                v-model="form.latitude"
                :rules="[
                  $rules.numeric('Latitude deve conter apenas números.')
                ]"
                dense
                filled
                label="Latitude"
                lazy-rules
              />
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4">
              <q-input
                v-model="form.longitude"
                :rules="[
                  $rules.numeric('Longitude deve conter apenas números.')
                ]"
                dense
                filled
                label="Longitude"
                lazy-rules
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-input
                v-model="form.area"
                :rules="[
                  $rules.numeric('Àrea (ha) deve conter apenas números.')
                ]"
                dense
                filled
                label="Àrea (ha)"
                lazy-rules
              />
            </div>

            <div class="col-xs-12">
              <q-card-section class="q-pa-none">
                <div class="text-subtitle2">Endereço</div>
              </q-card-section>

              <q-separator />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8">
              <q-input
                v-model="form.address"
                :rules="[
                  $rules.maxLength(100, 'Endereço deve ter no máximo 100 caracteres.')
                ]"
                dense
                filled
                label="Endereço"
                lazy-rules
              />
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4">
              <q-input
                v-model="form.zip_code"
                :rules="[
                  $rules.maxLength(8, 'CEP deve ter no máximo 8 caracteres.')
                ]"
                dense
                filled
                label="CEP"
                lazy-rules
              />
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4">
              <q-input
                v-model="form.number"
                :rules="[
                  $rules.maxLength(4, 'Número deve ter no máximo 4 caracteres.')
                ]"
                dense
                filled
                label="Número"
                lazy-rules
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-input
                v-model="form.neighborhood"
                :rules="[
                  $rules.maxLength(60, 'Bairro deve ter no máximo 60 caracteres.')
                ]"
                dense
                filled
                label="Bairro"
                lazy-rules
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-input
                v-model="form.complement"
                :rules="[
                  $rules.maxLength(100, 'Complemento deve ter no máximo 100 caracteres.')
                ]"
                dense
                filled
                label="Complemento"
                lazy-rules
              />
            </div>

            <div class="col-xs-12 col-sm-3 col-md-3">
              <q-select
                ref="state"
                v-model="form.state"
                :options="options.states"
                :rules="[
                  $rules.required('Estado não informado.')
                ]"
                @input="getCitiesOfSelectedState"
                clearable
                dense
                filled
                label="Estado"
                lazy-rules
                options-dense
              />
            </div>

            <div class="col-xs-12 col-sm-5 col-md-5">
            <q-select
                ref="city"
                v-model="form.city_id"
                :disable="!form.state"
                :options="options.cities"
                :rules="[
                  $rules.required('Estado não informado.')
                ]"
                clearable
                dense
                emit-value
                filled
                label="Cidade"
                lazy-rules
                map-options
                options-dense
                option-label="description"
                option-value="id"
              />
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4">
              <q-input
                v-model="form.country"
                :disable="options.states.indexOf(form.state) !== -1"
                :rules="[
                  $rules.maxLength(60, 'País deve ter no máximo 100 caracteres.')
                ]"
                dense
                filled
                label="País"
                lazy-rules
              />
            </div>
          </div>
        </q-form>
      </template>

      <template v-slot:actions>
        <q-btn
          v-if="farm.action === 'update'"
          @click="destroyDialog = true"
          class="q-ml-sm q-pr-xs"
          color="negative"
          icon="delete"
          label="Excluir"
        />

        <q-space />

        <q-btn
          @click.stop="setMethod(farm.action, form)"
          color="primary"
          label="Salvar"
        />

        <q-btn
          @click.stop="closeDialog"
          class="q-mr-sm"
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
  description: '',
  management_type: null,
  latitude: '',
  longitude: '',
  area: '',
  address: '',
  number: '',
  zip_code: '',
  complement: '',
  neighborhood: '',
  state: '',
  city_id: '',
  country: ''
}

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PageFarmFom',

  data () {
    return {
      destroyDialog: false,
      destroyText: null,
      form: formDefault,
      options: {
        management_types: [],
        states: [],
        cities: []
      }
    }
  },

  computed: {
    ...mapState('address', [
      'states'
    ]),

    ...mapState('farm', [
      'farm'
    ])
  },

  async created () {
    await this.getStates()

    // Lista de Estados
    this.options.states = this.states

    // Tipo de Gestão
    const managementTypes = await this.getOptions(4)
    this.options.management_types = managementTypes.options

    const { action, form } = this.farm

    if (action === 'create') this.form = formDefault
    else {
      const fields = {
        id: form.id,
        description: form.description,
        management_type: form.management_type,
        latitude: form.latitude,
        longitude: form.longitude,
        area: form.area,
        address: form.address,
        number: form.number,
        zip_code: form.zip_code,
        complement: form.complement,
        neighborhood: form.neighborhood,
        state: form.state,
        city_id: form.city_id,
        country: form.country
      }

      this.form = fields
      await this.getCitiesOfSelectedState(form.state)
    }
  },

  methods: {
    ...mapActions('address', [
      'getCities',
      'getStates'
    ]),

    ...mapActions('farm', [
      'create',
      'update',
      'remove'
    ]),

    ...mapActions('option', [
      'getOptions'
    ]),

    ...mapMutations('farm', [
      'setAction',
      'setDialog',
      'setFarm'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setFarm(formDefault)
    },

    closeDestroyDialog () {
      this.destroyDialog = false
      this.destroyText = null
    },

    async setMethod (method, params) {
      this.$refs.management_type.validate()
      this.$refs.state.validate()
      this.$refs.city.validate()

      const validate = await this.$refs.form.validate()

      if (validate) {
        await this[method](params)
      }
    },

    async destroy () {
      if (this.farm.action === 'update' && !!this.destroyDialog && this.destroyText === 'excluir') {
        const res = await this.remove(this.form.id)

        if (res.status) {
          this.destroyDialog = false
          this.destroyText = null
        }
      }
    },

    async getCitiesOfSelectedState () {
      this.options.cities = (await this.getCities(this.form.state)).cities
    }
  },

  watch: {
    'form.state' () {
      if (this.options.states.indexOf(this.form.state) !== -1) this.form.country = 'BRASIL'
      else {
        this.form.city_id = ''
        this.form.country = ''
      }
    }
  }
}
</script>
