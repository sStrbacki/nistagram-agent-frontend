import api from '../../api/index'
import axios from 'axios'
import Vue from 'vue'

export default {
    state: {
        catalog: {
            products: []
        }
    },
    mutations: {
        setProducts(state, value){
            state.catalog.products = value
        }
    },
    actions: {
       fetchAvailable(context){
           axios.get(api.products.available)
           .then((res) => {
                context.commit('setProducts', res.data)
           })
       },
       addToShoppingCart(context,item){
           //TODO remove an username when jwt is configured
           item = {...item, ...{ username: "johndoe" } }
           axios.post(api.shoppingCart.root, item)
           .then(() => {
                Vue.notify({
                    group: 'notification',
                    text: "Product successfully added to your shopping cart!",
                    type: 'success'
                })
           })
       }
    }
}