<template>
<div>
    <navi></navi>
    <h1> Modules </h1>
    <h2> test</h2>
    is it lagging my why
    <br>

    <input type="text" v-model="query">
    <br>
    <button v-on:click="loadNews">Submit</button>
    <br>
    {{ posts }}
    <br>
    <ul>
        <li v-for="module in posts" v-bind:key="module"> 
            {{ module.moduleCode }} 
        </li>
    
    </ul>
    <!--
    <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Module Code</th>
                    <th>Module Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="module in posts.slice(0,5)" v-bind:key="module"> 
                    <td>{{module.moduleCode}} </td>
                    <td>{{module.title}}</td>
                    <td>{{module.semesters}}</td>
                </tr>
            </tbody>
        </table>
        -->
    <div class="search-wrapper">
        <input type='text' v-model="search" placeholder="Search module"/>
    </div>
    

</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            info:null,
            query:''
        }
    },
    /*
    The following block pulls a list of all the modules in a 
    particular date range from nusmods api
    */
        mounted () {
            axios.get('https://api.nusmods.com/v2/2018-2019/moduleList.json')
        .then(response => (this.posts = response.data))
        .catch(error => console.log(error))
        },
        loadNews () {
            axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+this.query + '.json')
            .then(response => (this.posts = response.data))
            .catch(error => console.log(error))
        }
        

    }
</script>

<style scoped>


</style>