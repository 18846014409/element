<template>
    <fieldset>
        <legend>cart</legend>
        <ul>
            <li v-for="item in carts" :key="item.id">
                商品:<b> {{ item.title }}</b>
                ---
                价格:<b>{{ item.price }}</b>
                ---
                数量:<b>{{ item.count }}</b>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <button>移除购物车</button>
            </li>
        </ul>
    </fieldset>
</template>
<script setup>
//引入cart的stroe
import useCartStore from "../store/cart"
import { storeToRefs } from "pinia"
//使用cart的store

let cartStore = useCartStore();

//解构store中的数据

let { carts } = cartStore;

</script>