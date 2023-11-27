<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p> {{error}} </p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <div class="card-wrap">
        <div class="left-side"></div>
        <div class="form-wrap">
          <h3>Sign-Up, <b>It's Free!</b></h3>
          <form @submit.prevent="submitForm">
            <base-button
              type="button"
              :mode="currentAction"
              @click="switchAuthMode()"
            >
              Sign-up
            </base-button>
            <base-button
              type="button"
              :mode="switchModeButton"
              @click="switchAuthMode()"
            >
              Login
            </base-button>
            <template :key="field.id" v-for="field in fields">
              <base-input
                class="my-input"
                v-model="field.value"
                :label="field.label"
                :error="field.error"
                :is-masked="field.isMasked"
                @clickedAfterIcon="afterIconHandler(field)"
                @blur="validateField(field)"
              >
                <template v-slot:iconBefore v-if="field.prependIcon">
                  <IconSet
                    :name="field.prependIcon"
                    :color="field.error ? '#dd3c3c' : '#1187F4'"
                  />
                </template>
                <template v-slot:iconAfter v-if="field.appendIcon">
                  <IconSet
                    :name="field.appendIcon"
                    :color="field.error ? '#dd3c3c' : field.isMasked ? '#CCCCCC' : '#1187F4'"
                  />
                </template>
              </base-input>
              <p v-if="field.error" style="color: red;">{{ getErrorMessage(field) }}</p>
            </template>
            <div class="form-control" v-if="partnerField && this.mode === 'signup' ">
              <base-input
                v-model="partnerNumber"
                :label="'Partner Number'"
              ></base-input>
            </div>
            <base-button type="submit" mode="full" >{{ submitButton }}</base-button>
          </form>
          <div>
            <div class="separation-text">
              <hr><p>Or</p><hr>
            </div>
            <img :src="require(`@/assets/google.png`)" alt="icon" />
            <img :src="require(`@/assets/facebook.png`)" alt="icon" />
            <img :src="require(`@/assets/apple.png`)" alt="icon" />
          </div>
          <p class="subscribe-info-text" >By creating an account you agree to the privacy policy and to receive economic and marketing comunnications from AvaTrade. You can remove yourself from the mailing list at anytime.</p>
          <p v-if="this.mode === 'signup'">Have a partner number?
            <base-button
            type="button"
            mode="link"
            @click="addPartnerNumber">
              Click here
            </base-button>
          </p>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BaseDialog from '@/components/ui/BaseDialog'
import BaseCard from '@/components/ui/BaseCard'
import BaseSpinner from '@/components/ui/BaseSpinner'
import BaseInput from '@/components/ui/BaseInput'
import IconSet from '@/components/ui/IconSet'

export default {
  name: 'AuthView',
  components: {
    BaseButton,
    BaseDialog,
    BaseCard,
    BaseSpinner,
    BaseInput,
    IconSet
  },
  data () {
    return {
      fieldsData: {
        email: '',
        password: ''
      },
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
      partnerField: false,
      partnerNumber: '',
      fields: [
        {
          id: 1,
          label: 'Email',
          name: 'email',
          prependIcon: 'mail',
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true,
            isEmail: true
          }
        },
        {
          id: 2,
          label: 'Password',
          name: 'password',
          prependIcon: 'key',
          appendIcon: 'hidden-eye',
          isMasked: true,
          error: false,
          value: '',
          rules: {
            required: true
          }
        }
      ]
    }
  },
  computed: {
    currentAction () {
      return this.mode === 'signup' ? 'outline' : 'flat'
    },
    submitButton () {
      return this.mode === 'login' ? 'Login' : 'Create My Account'
    },
    switchModeButton () {
      return this.mode === 'login' ? 'outline' : 'flat'
    }
  },
  methods: {
    afterIconHandler (field) {
      if (field.name === 'password') {
        field.isMasked = !field.isMasked
        field.appendIcon = field.isMasked ? 'hidden-eye' : 'active-eye'
      }
    },
    addPartnerNumber () {
      this.partnerField = !this.partnerField
    },
    switchAuthMode () {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
    },
    validateField (field) {
      field.error = false

      for (const rule in field.rules) {
        if (rule === 'required' && !field.value) {
          field.error = true
          return // Stop further validation if the field is required but empty
        }

        // Apply other validation rules here based on 'rule'
        // For example, email validation, minimum length, etc.
        if (rule === 'isEmail' && !this.validateEmail(field.value)) {
          field.error = true
          return
        }

        // Add more conditions for other rules...
      }
    },
    validateEmail (value) {
      // Email validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    },
    getErrorMessage (field) {
      if (field.rules.required && !field.value) {
        return `${field.label} is required`
      }

      if (field.rules.isEmail && !this.validateEmail(field.value)) {
        return `Please enter a valid ${field.label}`
      }

      // Add more error messages based on other rules...

      return ''
    },
    async submitForm () {
      this.formIsValid = true
      this.fields.forEach(field => {
        this.validateField(field)
        if (field.error) {
          this.formIsValid = false
        }
        this.fieldsData[field.name] = field.value
      })

      this.isLoading = true

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', this.fieldsData)
          // Send signup request
        } else {
          console.log('signup', this.$store)
          await this.$store.dispatch('signup', this.fieldsData)
          // Send login request
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'deposit')
        this.$router.replace(redirectUrl)
      } catch (error) {
        this.error = error.message || 'An error occurred.'
      }

      this.isLoading = false
    },

    handleError () {
      this.error = null
    }
  }
}
</script>

<style scoped>

.card-wrap {
  display: grid;
  grid-template-columns: 3fr 5fr;
}
.form-wrap {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h3 {
  font-size: 1.5rem;
  margin-bottom: 0.1rem;
  color: #1187F4;
}
.left-side {
  background-color: #E5F3FF;
  height: 100%;
}

.subscribe-info-text {
  font-size: 0.8rem;
  padding: 10px;
  margin-top: 1rem;
}

.separation-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

hr{
  width: 40%;
  height: 1px;
  background-color: #A5A5A5;
  border: none;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
