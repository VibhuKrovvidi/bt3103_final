<template>
<div>
    <navi></navi>
    <h1> Modules </h1>
    <h2> test</h2>
    <li v-for="module in posts" v-bind:key="module"> {{ module.moduleCode}} </li>
    

</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            info: null
        }
    }    ,
    /*
    The following block pulls a list of all the modules in a 
    particular date range from nusmods api
    */
    mounted () {
        axios.get('https://api.nusmods.com/v2/2018-2019/moduleList.json')
      .then(response => (this.posts = response.data))
    }
}
</script>

<style scoped>

</style>