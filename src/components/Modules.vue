<template>
<div>
    <navi></navi>
    <br><br>
    <h1> Modules </h1>
    <h2> Hello name, which modules are you interested in exploring?</h2>

    <br>
    <div>
        <h3> What year are you in </h3>
        <div class = 'year_selector'>
            <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            </select>
        </div>
        <br>
        <span>Year Selected: {{ selected }}</span>
    </div>

    <div v-if="selected == 1">
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 1 Sem 1 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y1S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 1 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y1S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
    </div>

    <div v-if="selected == 2">
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 1 Sem 1 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y1S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 1 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y1S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 2 Sem 1 Modules Taken
                </h3>


                    <textarea v-model="Y2S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 2 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y2S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
    </div>

    <div v-if="selected == 3">
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 1 Sem 1 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y1S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 1 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y1S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 2 Sem 1 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y2S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 2 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y2S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
        <section class="only_year_one">
            <div class="one">
                <h3>
                    Year 3 Sem 1 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>

                    <textarea v-model="Y3S1_modules" placeholder="CS1010S, BT1101">

                    </textarea>
            </div>
            <div class="two">
                <h3>
                    Year 3 Sem 2 Modules Taken
                </h3>
                <span>Please leave a comma after every module</span>
                <br>
                    <textarea v-model="Y3S2_modules" placeholder="CS1010S, BT1101">
                    </textarea>
            </div>
        </section>
    </div>
    
    <br>
    <button id=submit v-on:click="combinedFunction">Submit Modules Taken </button>
    <br>
    <br>
    <button id=submit v-on:click="removeDuplicateModules">Generate Potential Modules To Take</button>

    <div>
        <h4> List of modules you can take </h4>        
    </div>

    <div class = 'container_for_modules' >
        <table class = 'table table-stripped'>
            <thead>
                <tr>
                    <th>Module Code</th>
                    <th>Module Name</th>
                    <th>Semester</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="data">
            </tbody>
        </table>
    </div>


</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            selected:'',
            Y1S1_modules:[],
            Y1S2_modules:[],
            Y2S1_modules:[],
            Y2S2_modules:[],
            Y3S1_modules:[],
            Y3S2_modules:[],
            test:'xx',
            modulesTaken:[],
            modulesThatCanBeTaken:[],
            finalArray:[],
            finalJson:{},
            showAllModules:false,

        }
    },
        
        methods: {
           parseInputList: function(){
                // This function takes in the string input by the user
                // splits it up to return a list of the modules taken, trimmed
                var list_of_modules_taken = this.Y1S1_modules.split(",");
                var list_trimmed = []
                var i;
                for (i = 0; i < list_of_modules_taken.length; i++) {
                    list_trimmed.push(list_of_modules_taken[i].trim());
                }
                return list_trimmed;
            },
            axiostest: function(moduleCode) {
                // takes in a moduleCode and pulls data from NUSMODSapi
                return axios.get('https://api.nusmods.com/v2/2019-2020/modules/'+moduleCode + '.json')
                .then(response => response.data)
            },
            testingAPI: async function() {
                // Takes in the list of modules that have been input by the user
                // provides the information to our thismodulestaken
                var listOfModules = this.parseInputList();
                console.log(listOfModules);
                var i;
                for (i = 0; i<listOfModules.length; i++){
                    let json_module = await this.axiostest(listOfModules[i]);
                    this.modulesTaken.push(json_module)
                }
                for (i=0; this.modulesTaken.length; i++){
                    this.modulesThatCanBeTaken.push(this.modulesTaken[i].fulfillRequirements);
                }
                console.log("before function")
            },
            removeDuplicateModules: async function(){
                var listOfNonDuplicates = [];
                var i;
                for (i=0; i<this.modulesThatCanBeTaken.length; i++){
                    var x;
                    for (x=0; x<this.modulesThatCanBeTaken[i].length; x++){
                        if (listOfNonDuplicates.indexOf(this.modulesThatCanBeTaken[i][x]) == -1){
                            listOfNonDuplicates.push(this.modulesThatCanBeTaken[i][x]);
                        }
                    }
                }
                this.finalArray = listOfNonDuplicates;
                var g;
                for (g=0; g<listOfNonDuplicates.length; g++){
                    var moduleCodeFulfilled = listOfNonDuplicates[g];
                    let json_module = await this.axiostest(moduleCodeFulfilled);
                    this.finalJson[moduleCodeFulfilled] = json_module;
                }
                var arrayOfMods = Object.keys(this.finalJson);
                var temp = "";
                for (var n=0; n<arrayOfMods.length; n++){
                    console.log(arrayOfMods[n])
                    temp += "<tr>";
                    temp += "<td>" + arrayOfMods[n] + "</td>";
                    temp += "<td>" + this.finalJson[arrayOfMods[n]]['title'] + "</td>";
                    temp += "<td>" + this.getSemesterFromModule(this.finalJson[arrayOfMods[n]]) + "</td>";
                    temp += "<td>" + this.finalJson[arrayOfMods[n]]['description'] + "</td></tr>";
                }
                
                this.showAllModules = true;
                document.getElementById("data").innerHTML = temp;                
            }
            ,
            combinedFunction: function(){
                this.testingAPI();

            },
            getModulePreReq: async function(modCode) {
                // takes in a modcode and gets the required pre-req
                return axios.get('https://api.nusmods.com/v2/2018-2019/modules/'+modCode + '.json')
                .then(response => response.data.prerequisite)
            },
            checkIfModCanTake: async function(modCode){
                let preReqs = await this.getModulePreReq(modCode);
                console.log(preReqs);
            },
            getSemesterFromModule: function(moduleJson){
                var moduleSemInfo = moduleJson['semesterData'];
                if (moduleSemInfo.length >=2) {
                    return "Both"
                }                
                return moduleSemInfo[0]['semester'];
            }


        }
}
    
    
</script>

<style scoped>
.only_year_one {
  width: 80%;
  height: 150px;
  background: #003D7C;
  margin: auto;
  padding: 10px;
}


.only_year_one > .one {
  width: 50%;
  height: 150px;
  background: #F5AD69;
  float: left;
}

.only_year_one > .two {
  width: 49%;
  height: 150px;
  background: #F5AD69;
  float:right;
}

table {
  border: 1px solid black;
}

.container_for_modules {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background: pink;
}

.table-stripped{
    background: #003D7C;
    border: 1px solid black;
    width: 100%;
    color: white;
}

.table-stripped > tbody {
    background: #F5AD69;
    margin-bottom: auto;
    margin-top: auto;
    line-height: 30px;
    color: black;
    padding: 10px;
}







</style>