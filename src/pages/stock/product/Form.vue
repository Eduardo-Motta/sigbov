<template>
  <sigbov-dialog
    :value="pasture.dialog"
  >
    <template v-slot:content>
      <q-form ref="form">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <q-card-section class="q-pa-none">
              <div class="text-subtitle2">Pasto</div>
            </q-card-section>

            <q-separator />
          </div>

          <div class="col-xs-12">
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

          <div class="col-xs-6">
            <q-select
              ref="farm"
              v-model="form.farm_id"
              :options="options.farms"
              :rules="[
                $rules.required('Fazenda não informada.')
              ]"
              dense
              disable
              emit-value
              filled
              label="Fazenda"
              lazy-rules
              map-options
              options-dense
              option-label="description"
              option-value="id"
            />
          </div>

          <div class="col-xs-6">
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
        </div>
      </q-form>
    </template>

    <template v-slot:actions>
      <q-btn
        @click.stop="setMethod(pasture.action, form)"
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
</template>

<script>
const formDefault = {
  id: undefined,
  description: '',
  farm_id: '',
  area: ''
}

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PagePastureForm',

  data () {
    return {
      form: formDefault,
      options: {
        farms: []
      }
    }
  },

  computed: {
    ...mapState('app', [
      'session'
    ]),

    ...mapState('pasture', [
      'pasture'
    ])
  },

  async created () {
    const { action, form } = this.pasture

    this.options.farms = (await this.optionFarms()).farms

    if (action === 'create') this.form = Object.assign(formDefault, { farm_id: this.session.farm_id })
    else {
      const fields = {
        id: form.id,
        description: form.description,
        farm_id: form.farm_id,
        area: form.area
      }

      this.form = fields
    }
  },

  methods: {
    ...mapActions('farm', {
      optionFarms: 'find'
    }),

    ...mapActions('pasture', [
      'create',
      'update'
    ]),

    ...mapMutations('pasture', [
      'setAction',
      'setDialog',
      'setPasture'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setPasture(formDefault)
    },

    async setMethod (method, params) {
      this.$refs.farm.validate()

      const validate = await this.$refs.form.validate()

      if (validate) {
        await this[method](params)
      }
    }
  }
}
</script>
