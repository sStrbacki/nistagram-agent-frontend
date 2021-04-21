<template>
<body>
  <div id="app">
    <router-view/>
    <notifications group="notification"
    classes="vue-notification custom-notif" 
    position="top center"
    width="20%"/>
  </div>
</body>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200&display=swap');

#app {
  font-family: 'Cairo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
 
}
body{
  background: #16222A;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3A6073, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #3A6073, #16222A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.custom-notif{
  font-size: 20px !important;
}

</style>
