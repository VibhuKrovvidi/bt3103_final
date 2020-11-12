<template>
<div>
    <navi></navi>
    <br><br>
    <h1> Modules </h1>
    <h2> Hello name, which modules are you interested in exploring?</h2>

    <br>
    <div>
        <h3> What year are you in </h3>
        <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        </select>
        <br>
        <span>Selected: {{ selected }}</span>
    </div>

    <div v-if="selected == 1">
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 1 Sem 1 Modules Taken
                </h3>
                
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y1S1_modules" placeholder="add multiple lines"></textarea>
            </div>
            <div class="two">
                <h3>
                    Year 1 Sem 2 Modules Taken
                </h3>
            </div>
        </section>
    </div>

    <button v-on:click="testingAPI">Takes in module input and searches api </button>

    <div v-for="items in this.modulesTaken" v-bind:key="items">
        {{ items.fulfillRequirements }}
    </div>
    

</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            selected:'',
            info:null,
            entire_json:{},
            query:'',
            module_description:'',
            module_faculty:'',
            prereqTree:'',
            Y1S1_modules:[],
            test:'xx',
            modulesTaken:[],

        }
    },
        created: function() {
            this.loadNews();
        },
        methods: {
            loadNews: function() {
            axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+this.query + '.json')
            .then(response => (this.entire_json = response.data))
            .catch(error => console.log(error))
            .then(console.log("Module Data Pulled"))
            },
            
            parseInputList: function(){
                var list_of_modules_taken = this.Y1S1_modules.split(",");
                var list_trimmed = []
                var i;
                for (i = 0; i < list_of_modules_taken.length; i++) {
                    list_trimmed.push(list_of_modules_taken[i].trim());
                }
                return list_trimmed;
            },
            axiostest: function(moduleCode) {
                return axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+moduleCode + '.json')
                .then(response => response.data)
            },
            testingAPI: async function() {
                var listOfModules = this.parseInputList();
                console.log(listOfModules);

                var i;
                for (i = 0; i<listOfModules.length; i++){
                    let json_module = await this.axiostest(listOfModules[i]);
                    this.modulesTaken.push(json_module)
                }
                
            }
        }
    }
</script>

<style scoped>
.only_year_one {
  width: 80%;
  height: 200px;
  background: pink;
  margin: auto;
  padding: 10px;
}


.only_year_one > .one {
  width: 50%;
  height: 200px;
  background: cornsilk;
  float: left;
}

.only_year_one > .two {
  width: 49%;
  height: 200px;
  background: cornsilk;
  float:right;
}



</style>
