<template>
    <b-container>
        <b-row cols="2" align-h="center">
            <div class="product-form">
                <b-row align-h="center">
                    <h1>Add product</h1>
                </b-row>
                <b-row align-h="center">
                    <product-form></product-form>
                </b-row>
            </div>
        </b-row>
    </b-container>
</template>

<script>
import ProductForm from '../components/products/ProductForm.vue'

export default {
    components: { ProductForm },
}
</script>

<style scoped>
.product-form {
    margin-top: 5em;
    color: rgb(36, 35, 35);
    background-color: rgb(224, 220, 220);
    padding: 3em;
    border-radius: 6px;
    box-shadow: 5px 5px 10px #1d1d1d;
}
</style>