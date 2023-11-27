<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #1187F4;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  outline: none;
}

.flat {
  background-color: transparent;
  color: #1187F4;
  border: none;
  border-radius: 30px;
}

.outline {
  color:  #1187F4;
  background-color: white;
  border-bottom: 3px solid #1187F4;
}

.link {
  color: #1187F4;
  background-color: transparent;
  border-bottom: 1px solid #1187F4;
  padding: 0;
}
.full {
  margin: 20px 0px;
  border-radius: 30px;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  border-bottom: 3px solid #1187F4;
  border-radius: 0px;
}
</style>
