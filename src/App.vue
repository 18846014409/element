
<template>
  <div id="app">
    <h1>{{version}}</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>

let version = import.meta.env.VITE_VERSION
</script>
