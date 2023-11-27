<template>
  <the-header></the-header>
  <router-view/>
</template>
<script>
import TheHeader from '@/components/layout/TheHeader'
export default {
  name: 'App',
  components: {
    TheHeader
  },
  created () {
    this.$store.dispatch('tryLogin')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
