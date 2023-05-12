import { defineStore } from "pinia"
import { ref } from "vue"
//引入productStore
import useProductStore from "./product"

export default defineStore('cart', () => {
    //使用productStore
    let productStore = useProductStore()

    //购物车数据状态
    let carts = ref([])
    //将商品添加到购物车的方法

    let addToCart = item => {
        // console.log(item)

        //通过item到productStore中查找
        let productTarget = productStore.products.find(productItem => productItem.id === item.id)

        //查找到这条数据之后,让库存-1

        productTarget && productTarget.inventory--

        //判断carts中是否已经存在item这条数据

        //通过id在carts中查找是否存在

        let target = carts.value.find(v => v.id === item.id)

        //如果存在,然数量+1
        if (target) {
            target.count++
        } else {
            //如果不存在,生成一条购物车数据

            let cartItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                //数量,数据第一次加进来,购物车数量肯定是1
                count: 1
            }
            //插入到数组中
            carts.value.push(cartItem)
        }
    }


    return { carts, addToCart }
})