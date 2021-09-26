<template>
  <sigbov-dialog
    :value="productGroup.dialog"
  >
    <template v-slot:content>
      <q-form ref="form">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <q-card-section class="q-pa-none">
              <div class="text-subtitle2">Grupo de Produto</div>
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
        </div>
      </q-form>
    </template>

    <template v-slot:actions>
      <q-btn
        @click.stop="setMethod(productGroup.action, form)"
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
  name: 'PageStockProductGroupForm',

  data () {
    return {
      form: formDefault
    }
  },

  computed: {
    ...mapState('app', [
      'session'
    ]),

    ...mapState('stockProductGroup', [
      'productGroup'
    ])
  },

  async created () {
    const { action, form } = this.productGroup

    if (action === 'create') this.form = formDefault
    else {
      const fields = {
        id: form.id,
        description: form.description
      }

      this.form = fields
    }
  },

  methods: {
    ...mapActions('stockProductGroup', [
      'create',
      'update'
    ]),

    ...mapMutations('stockProductGroup', [
      'setAction',
      'setDialog',
      'setProductGroup'
    ]),

    closeDialog () {
      this.setAction('')
      this.setDialog(false)
      this.setProductGroup(formDefault)
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
