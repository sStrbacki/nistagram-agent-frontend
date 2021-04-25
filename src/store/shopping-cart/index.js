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
           axios.get(api.shoppingCart.root + '/user/Pantelic')
           .then((response) => {
                context.commit('setItems', response.data);
           })
       },
       placeOrder(context) {
            axios.post(api.shoppingCart.root + '/user/Pantelic', context.state.items)
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
       }
    }
}