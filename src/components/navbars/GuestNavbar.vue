<template>
    <div>
        <b-navbar toggleable="lg" type="dark" class="user-navbar" fixed="top" :sticky=true>
            <b-navbar-brand>
                <b-row align-v="center" class="ml-2">
                    <b-icon icon="shop" class="mr-2"></b-icon>
                    <div class="ml-2">My shop</div>
                </b-row>
            </b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item :to="{ name: 'SignUp' }">
                        Sign up
                    </b-nav-item>
                    <b-nav-item :to="{ name: 'Login' }">
                        Login
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
          
    </div>
</template>