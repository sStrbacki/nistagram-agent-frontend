import api from '../../api/index';
import axios from 'axios';
import Vue from 'vue';

export default {
    state: {
        items: []
    },
    mutations: {
        setItems(state, value) {
            state.items = value;
        }
    },
    actions: {
       fetchShoppingCart(context) {
           axios.get(api.shoppingCart.root + 'user/johndoe')
           .then((response) => {
                context.commit('setItems', response.data);
           })
       },
       placeOrder(context) {
            axios.post(api.shoppingCart.root + 'user/johndoe', context.state.items)
            .then(response => {
                Vue.notify({
                    group: 'notification',
                    text: response.data,
                    type: 'success'
                });
            })
            .catch(error => {
                console.log(error.response.data);
                Vue.notify({
                    group: 'notification',
                    text: error.response.data,
                    type: 'error'
                });
            });
       },
       removeFromShoppingCart(context, shoppingCartItemId) {
        axios.delete(api.shoppingCart.root + shoppingCartItemId)
        .then(() => {
             Vue.notify({
                 group: 'notification',
                 text: "Product successfully removed from your shopping cart!",
                 type: 'success'
             });
             context.state.items = context.state.items.filter(item => {
                 item.id !== shoppingCartItemId
             })
        });
    }
    }
}