<template>
  <div
    class="input-wrapper"
    :class="[{ 'focused-input': isFocused }, { error: error }]"
  >
    <span
      class="icon-before"
      v-if="$slots.iconBefore"
      @click="$emit('clickedBeforeIcon')"
    >
      <slot name="iconBefore"></slot>
    </span>
    <div class="input-container">
      <label
        :class="[
          { active: isFocused || modelValue },
          { 'with-appended-icon': $slots.iconBefore },
        ]"
      >
        {{ label }}
      </label>
      <input
        :value="modelValue"
        @input="onInput"
        :type="inputType"
        class="input-field"
        @focus="isFocused = true"
        @blur="onInputBlur"
      />
    </div>
    <span
      class="icon-after"
      v-if="$slots.iconAfter"
      @click="$emit('clickedAfterIcon')"
    >
      <slot name="iconAfter"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isMasked: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocused: false
    }
  },
  computed: {
    inputType () {
      if (this.isMasked) return 'password'

      return this.type
    }
  },
  methods: {
    onInput (event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onInputBlur () {
      if (!this.modelValue) {
        this.isFocused = false
      }
      this.$emit('blur')
    }
  }
}
</script>
<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #cccccc;
  outline: none;
  padding: 12px 16px;
  border-radius: 5px;
  height: 56px;
  margin: 0 0 20px;
}

.input-wrapper.focused-input {
  border-color: #1187f4;
}

.input-wrapper label {
  color: #cccccc;
  font-family: 'Effra', sans-serif;
  font-size: 14pt;
  font-weight: 400;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10%;
  transition: 0.3s ease all;
}

.input-wrapper label.active {
  top: -5px;
  transform: translate3d(0, -100%, 0);
  font-size: 10.5pt;
  color: #1187f4;
  padding: 3px;
  opacity: 1;
  background: #fff;
}

.input-wrapper label.active.with-appended-icon {
  left: -32px;
}

.input-field:focus ~ label,
.input-field:not(:placeholder-shown) ~ label {
  top: 15%;
  transform: translate3d(0, -100%, 0);
  font-size: 10.5pt;
  color: #cccccc;
  padding: 3px;
  opacity: 1;
  background: #fff;
}

.input-wrapper.error {
  border-color: #dd3c3c;
}

.input-wrapper.error.focused-input {
  border-color: #dd3c3c;
}

.input-wrapper.error label {
  color: #dd3c3c;
}

.input-wrapper.error .input-field{
  color: #dd3c3c;
}

.input-field:focus ~ label,
.input-field:not(:placeholder-shown) ~ label {
  color: #dd3c3c;
}

.icon-before,
.icon-after {
  display: flex;
  align-items: center;
  margin: 0 8px 0 0;
}

.icon-after {
  margin: 0 0 0 8px;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-field {
  font-size: 14pt;
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.input-field:focus {
  outline: none;
}

.label {
  color: #cccccc;
  font-family: 'Effra', sans-serif;
  font-size: 14pt;
  font-weight: 400;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10%;
  transition: 0.3s ease all;
}

.label.active {
  top: -5px;
  transform: translate3d(0, -100%, 0);
  font-size: 10.5pt;
  color: #1187f4;
  padding: 3px;
  opacity: 1;
  background: #fff;
}

.label.active.with-appended-icon {
  left: -32px;
}
</style>
