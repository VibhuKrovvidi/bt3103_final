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


    <h3> Module Description </h3>
    {{ entire_json.description }}
    
    <h3> Module Faculty </h3>
    {{ entire_json.faculty }}

    <h3> Module PreReq </h3>
    {{ entire_json.prerequisite }}

    
    

</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            info:null,
            entire_json:{},
            query:'',
            module_description:'',
            module_faculty:'',
            prereqTree:'',

        }
    },
        created: function() {
            this.loadNews();
        },
        methods: {
            loadNews: function() {
            axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+this.query + '.json')
            .then(response => (this.entire_json = response.data))
            .then(response => (this.module_description = response.description))
            .then(response => (this.module_faculty = response.faculty))
            .catch(error => console.log(error))
            .then(console.log(this.module_description))
            }
        }
        

    }
</script>

<style scoped>


</style>
