<template>
<div>
    <navi></navi>
    <br><br>
    <h1> Modules </h1>
    <h2> Hello name, which modules are you interested in exploring?</h2>
    <br>

    <input type="text" v-model="query">
    {{ query }}
    <br>
    <button v-on:click="loadNews">Submit</button>

    <br>
    {{ selected_module }}
    <br>

    <ul class="list-group">
        <li v-for="responder in required_data.data" v-bind:key="responder">
            {{ responder.acadYear }}</li>
    </ul>

    

</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            info:null,
            selected_module:[],
            query:'',
            required_data:[],
        }
    },
        created: function() {
            this.loadNews();
        },
        methods: {
            loadNews: function() {
            axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+this.query + '.json')
            .then(response => (this.selected_module = response.data))
            .then(response => (this.required_data = response))
            .catch(error => console.log(error))
            },
            cleaning_api_data: function() {


            }
        }
        

    }
</script>

<style scoped>


</style>
