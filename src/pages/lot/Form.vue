<template>
  <div>
    <sigbov-dialog
      :value="lot.dialog"
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

            <div class="col-xs-12 col-sm-12 col-md-6">
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

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-select
                ref="pasture"
                v-model="form.pasture_id"
                :options="options.pastures"
                :rules="[
                  $rules.required('Pasto não informado.')
                ]"
                dense
                emit-value
                filled
                label="Pasto"
                lazy-rules
                map-options
                options-dense
                option-label="description"
                option-value="id"
              />
            </div>
          </div>
        </q-form>
      </template>

      <template v-slot:actions>
        <q-btn
          v-if="lot.action === 'update'"
          @click="destroyDialog = true"
          class="q-ml-sm q-pr-xs"
          color="negative"
          icon="delete"
          label="Excluir"
        />

        <q-space />

        <q-btn
          @click.stop="setMethod(lot.action, form)"
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
  pasture_id: ''
}

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PageLotForm',

  data () {
    return {
      destroyDialog: false,
      destroyText: null,
      form: formDefault,
      options: {
        pastures: []
      }
    }
  },

  computed: {
    ...mapState('lot', [
      'lot'
    ])
  },

  async created () {
    const { action, form } = this.lot

    this.options.pastures = (await this.optionPastures()).pastures

    if (action === 'create') this.form = formDefault
    else {
      const fields = {
        id: form.id,
        description: form.description,
        pasture_id: form.pasture_id
      }

      this.form = fields
    }
  },

  methods: {
    ...mapActions('pasture', {
      optionPastures: 'find'
    }),

    ...mapActions('lot', [
      'create',
      'update',
      'remove'
    ]),

    ...mapMutations('lot', [
      'setAction',
      'setDialog',
      'setLot'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setLot(formDefault)
    },

    closeDestroyDialog () {
      this.destroyDialog = false
      this.destroyText = null
    },

    async setMethod (method, params) {
      this.$refs.pasture.validate()

      const validate = await this.$refs.form.validate()

      if (validate) {
        await this[method](Object.assign(params, { farm_id: 1 }))
      }
    },

    async destroy () {
      if (this.lot.action === 'update' && !!this.destroyDialog && this.destroyText === 'excluir') {
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
