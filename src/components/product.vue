<template>
    <fieldset>
        <legend>product</legend>
        <button @click="productStore.fetchProducts">获取购物车数据</button>
        <ul>
            <li v-for="item in products" :key="item.id">
                商品:<b> {{ item.title }}</b>
                ---
                价格:<b>{{ item.price }}</b>
                ---
                库存:<b>{{ item.inventory }}</b>

                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;

                <button :disabled="item.inventory==0" @click="cartStore.addToCart(item)">+ 添加到购物车</button>
            </li>
        </ul>
    </fieldset>
</template>

<script setup>
//商品store
import useProductStore from "../store/product";
//cart的store
import useCartStore from "../store/cart"

import { storeToRefs } from "pinia"
//使用product store
let productStore = useProductStore();
//使用cart的store
let cartStore = useCartStore()
//解构store中的状态
let { products } = storeToRefs(productStore)
//点击按钮,将数据添加到购物车
</script>