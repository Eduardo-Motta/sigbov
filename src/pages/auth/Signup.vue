<template>
  <div
    :class="this.$q.screen.xs || this.$q.screen.sm ? '' : 'column items-center'"
  >
    <div class="col">
      <q-card
        :flat="this.$q.screen.xs || this.$q.screen.sm"
        class="shadow-1 signin-card"
        square
      >
        <q-card-section>
          <div class="q-pa-md">
            <div class="row q-col-gutter-none">
              <div class="col-6">
                1asas
              </div>
              <div class="col-6">
                <q-form
                  @submit="auth"
                  class="q-gutter-md"
                >
                  <q-input
                    v-model="formSignup.email"
                    :rules="[val => val && val.length > 0 || 'Informe seu endereço de e-mail.']"
                    dense
                    filled
                    label="E-mail"
                    lazy-rules
                  />

                  <q-input
                    v-model="formSignup.name"
                    :rules="[val => val && val.length > 0 || 'Informe seu nome completo.']"
                    dense
                    filled
                    label="Nome Completo"
                    lazy-rules
                  />

                  <q-input
                    v-model="formSignup.password"
                    :rules="[val => val && val.length > 0 || 'Informe sua senha.']"
                    dense
                    filled
                    label="Senha"
                    lazy-rules
                    type="password"
                  />

                  <q-input
                    v-model="formSignup.password_confirmation"
                    :rules="[val => val && val.length > 0 || 'Informe sua confirmação de senha.']"
                    dense
                    filled
                    label="Confirmação de Senha"
                    lazy-rules
                    type="password"
                  />

                  <q-input
                    v-model="formSignup.farm"
                    :rules="[val => val && val.length > 0 || 'Informe seu nome completo.']"
                    dense
                    filled
                    label="Descrição"
                    lazy-rules
                  />

                  <div>
                    <q-btn label="Cadastrar" type="submit" color="primary"/>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageAuthSignin',

  data () {
    return {
      formSignup: {
        city: '',
        email: '',
        farm: '',
        name: '',
        password: '',
        password_confirmation: '',
        state: ''
      }
    }
  },

  methods: {
    ...mapActions('auth', [
      'signin'
    ]),

    async auth () {
      try {
        const res = await this.signin({
          email: this.formSignup.email,
          password: this.$crypto(this.formSignup.password, 'sha256')
        })

        if (res.status) {
          this.$router.push('/')
          window.notify()
        }
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
@media (min-width:$breakpoint-sm-max)
  .signin-card
    width: 900px !important
    margin-top: 150px !important

  .signin-card
    width: 100%
    height: 100%

  .q-separator--vertical
    height: 100%
</style>
