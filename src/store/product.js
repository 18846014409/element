import { defineStore } from "pinia"
import { ref, computed } from "vue"

export default defineStore('product', () => {
    //声明状态
    let products = ref([]);

    //声明actions

    let fetchProducts = () => {
        //...
        fetch("http://chst.vip/data/index.json")
            .then(response => response.json())
            .then(res => {
                console.log(res);
                products.value = res.data;
            })
    }

    return { products, fetchProducts }
}, {
    // persist: true
})