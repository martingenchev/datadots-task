<template>
<div>
  <base-card>
    <div class="deposit-container">
      <div class="deposit-header">
        <h2>Deposit</h2>
        <p>Deposit money to your account</p>
      </div>
      <form class="deposit-form" @submit.prevent="depositAmount" >
        <div class="deposit-form__input">
          <template :key="field.id" v-for="field in fields">
            <base-input
              class="my-input"
              v-model="field.value"
              :label="field.label"
              :error="field.error"
              :is-masked="field.isMasked"
              @blur="validateField(field)"
            >
            </base-input>
            <p v-if="field.error" style="color: red;">{{ getErrorMessage(field) }}</p>
          </template>
        </div>
        <div class="deposit-form__button">
          <base-button
            type="submit"
            mode="full"
          >Deposit</base-button>
        </div>
      </form>
    </div>
  </base-card>
</div>
</template>
<script>
import BaseCard from '@/components/ui/BaseCard'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'

export default {
  components: {
    BaseCard,
    BaseInput,
    BaseButton
  },
  data () {
    return {
      fields: [
        {
          id: 1,
          label: 'Amount',
          name: 'amount',
          prependIcon: null,
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true
          }
        },
        {
          id: 2,
          label: 'Card Number',
          name: 'cardNumber',
          prependIcon: null,
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true,
            maxLength: 16
          }
        },
        {
          id: 3,
          label: 'Card Holder',
          name: 'cardHolder',
          prependIcon: null,
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true
          }
        },
        {
          id: 4,
          label: 'Expiration Date',
          name: 'expirationDate',
          prependIcon: null,
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true,
            maxLength: 5
          }
        },
        {
          id: 5,
          label: 'CVV',
          name: 'cvv',
          prependIcon: null,
          appendIcon: null,
          isMasked: false,
          error: false,
          value: '',
          rules: {
            required: true,
            maxLength: 3
          }
        }
      ]
    }
  },
  methods: {
    // TODO - Move to mixin
    validateField (field) {
      field.error = false

      for (const rule in field.rules) {
        if (rule === 'required' && !field.value) {
          field.error = true
          return // Stop further validation if the field is required but empty
        }

        if (rule === 'maxLength' && field.value.length === field.rules[rule]) {
          field.error = true
          return // Stop further validation if the field is required but empty
        }
      }
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
    depositAmount () {
      this.fields.forEach(field => {
        this.validateField(field)
      })

      const hasErrors = this.fields.some(field => field.error)

      if (hasErrors) {
        return
      }

      const depositData = {
        amount: this.fields[0].value,
        cardNumber: this.fields[1].value,
        cardHolder: this.fields[2].value,
        expirationDate: this.fields[3].value,
        cvv: this.fields[4].value
      }

      console.log(depositData)
    }
  }
}
</script>
<style scoped>
  .deposit-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }
  .deposit-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .deposit-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .deposit-form__input {
      width: 100%;
      margin-bottom: 1rem;
  }
  .deposit-form__button {
      width: 100%;
      margin-top: 2rem;
  }
</style>
