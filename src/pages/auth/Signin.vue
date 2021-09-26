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
            <q-form
              @submit="auth"
              class="q-gutter-md"
            >
              <q-input
                v-model="formSignin.email"
                :rules="[val => val && val.length > 0 || 'Informe seu endereço de e-mail.']"
                dense
                filled
                label="E-mail"
                lazy-rules
              />

              <q-input
                v-model="formSignin.password"
                :rules="[val => val && val.length > 0 || 'Informe sua senha.']"
                dense
                filled
                label="Senha"
                lazy-rules
                type="password"
              />

              <span style="font-size: 12.5px" class="link">Esqueceu sua senha?</span>

              <div>
                <q-btn label="Entrar" type="submit" color="primary"/>
                <q-btn label="Cadastre-se" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
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
      formSignin: {
        email: localStorage.getItem('sigbov:email'),
        password: ''
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
          email: this.formSignin.email,
          password: this.$crypto(this.formSignin.password, 'sha256')
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
    width: 400px !important
    margin-top: 150px !important

  .signin-card
    width: 100%
    height: 100%
</style>
