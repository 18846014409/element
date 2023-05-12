
<template>
  <div id="app">
    <h1>{{version}}</h1>
    <!-- <Product></Product>
    <hr>
    <Cart></Cart> -->

 

    <router-view></router-view>
  </div>
</template>

<script setup>
import Cart from './components/cart.vue';
import Product from './components/product.vue';

let version = import.meta.env.VITE_VERSION
</script>
