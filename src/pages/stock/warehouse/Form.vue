<template>
  <sigbov-dialog
    :value="warehouse.dialog"
  >
    <template v-slot:content>
      <q-form ref="form">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <q-card-section class="q-pa-none">
              <div class="text-subtitle2">Armazém</div>
            </q-card-section>

            <q-separator />
          </div>

          <div class="col-xs-12">
            <q-input
              v-model="form.name"
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
        </div>
      </q-form>
    </template>

    <template v-slot:actions>
      <q-btn
        @click.stop="setMethod(warehouse.action, form)"
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
  name: 'PageStockWarehouseForm',

  data () {
    return {
      form: formDefault
    }
  },

  computed: {
    ...mapState('app', [
      'session'
    ]),

    ...mapState('stockWarehouse', [
      'warehouse'
    ])
  },

  async created () {
    const { action, form } = this.warehouse

    if (action === 'create') this.form = formDefault
    else {
      const fields = {
        id: form.id,
        name: form.name
      }

      this.form = fields
    }
  },

  methods: {
    ...mapActions('stockWarehouse', [
      'create',
      'update'
    ]),

    ...mapMutations('stockWarehouse', [
      'setAction',
      'setDialog',
      'setWarehouse'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setWarehouse(formDefault)
    },

    async setMethod (method, params) {
      const validate = await this.$refs.form.validate()

      if (validate) {
        await this[method](params)
      }
    }
  }
}
</script>
