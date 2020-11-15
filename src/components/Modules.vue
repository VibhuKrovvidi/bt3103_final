<template>
<div>
    <navi></navi>
    <br><br>
    <h1> Modules </h1>
    <h2> Hello name, which modules are you interested in exploring?</h2>
    <p>
        The purpose of this section is to assist in your module planning. 
        <br>
        By inputting the modules you have taken, you will be able to see the modules you have unlocked.
    </p>

    <div>
        <h3> What year are you in?</h3>
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
    <div>
        <div class = 'faculty_selector'>
            <h3> Would you like to filter potential modules by Faculty?</h3>
            <select v-model="selectedFaculty">
            <option disabled value="">None</option>
            <option>All</option>
            <option>Arts and Social Science</option>
            <option>Computing</option>
            <option>Cont and Lifelong Education</option>
            <option>Dentistry</option>
            <option>Design and Environment</option>
            <option>Duke-NUS Medical School</option>
            <option>Engineering</option>
            <option>Institute of Systems Science</option>
            <option>LKY School of Public Policy</option>
            <option>Law</option>
            <option>Logistics Inst-Asia Pac</option>
            <option>Mechanobiology Institute (MBI)</option>
            <option>Multi Disciplinary Programme</option>
            <option>NUS</option>
            <option>NUS Business School</option>
            <option>NUS Graduate Sch for Int Science and Engineering</option>
            <option>Residential College</option>
            <option>Risk Management Institute</option>
            <option>SSH School of Public Health</option>
            <option>Science</option>
            <option>Temasek Defence Sys. Institute</option>
            <option>University Scholars Programme</option>
            <option>YST Conservatory of Music</option>
            <option>Yale-NUS College</option>
            <option>Yong Loo Lin Sch of Medicine</option>
            </select>
        </div>
        <br>
    </div>
    <div>
        <div class = 'faculty_selector'>
            <h3>Would you like to filter by semesters offered?</h3>
            <select v-model="selectedSemester">
                <option disabled value="">None</option>
                <option>1</option>
                <option>2</option>
                <option>Both</option>
            </select>
        </div>
        <br>
    </div>
    <br>
    <button id=submit v-on:click="removeDuplicateModules">Click to update table below</button>

    <div>
        <h4> List of modules you can take </h4>        
    </div>

    <div class = 'container_for_modules' >
        <table class = 'table table-stripped'>
            <thead>
                <tr>
                    <th>Module Code</th>
                    <th>Module Name</th>
                    <th>Faculty</th>
                    <th>Semester</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody id="data">
            </tbody>
        </table>
    </div>
    <br>
    poop
    <br>




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
            selectedFaculty:'',
            selectedSemester:'',

        }
    },
        
        methods: {
           parseInputList: function(){
                // This function takes in the string input by the user
                // splits it up to return a list of the modules taken, trimmed
                console.log('first');
                var list_of_modules_taken = this.Y1S1_modules.split(",");
                var list_trimmed = []
                var i;
                for (i = 0; i < list_of_modules_taken.length; i++) {
                    list_trimmed.push(list_of_modules_taken[i].trim());
                }

                if (this.Y1S2_modules.length > 0) {
                    var list_of_modules_taken_y1s2 = this.Y1S2_modules.split(",");
                    for (i = 0; i < list_of_modules_taken_y1s2.length; i++) {
                        list_trimmed.push(list_of_modules_taken_y1s2[i].trim());
                    }
                }

                if (this.Y2S1_modules.length > 0) {
                    var list_of_modules_taken_y2s1 = this.Y2S1_modules.split(",");
                    for (i = 0; i < list_of_modules_taken_y2s1.length; i++) {
                        list_trimmed.push(list_of_modules_taken_y2s1[i].trim());
                    }
                }
                if (this.Y2S2_modules.length > 0) {
                    var list_of_modules_taken_y2s2 = this.Y2S2_modules.split(",");
                    for (i = 0; i < list_of_modules_taken_y2s2.length; i++) {
                        list_trimmed.push(list_of_modules_taken_y2s2[i].trim());
                    }
                }
                if (this.Y3S1_modules.length > 0) {
                    var list_of_modules_taken_y3s1 = this.Y3S1_modules.split(",");
                    for (i = 0; i < list_of_modules_taken_y3s1.length; i++) {
                        list_trimmed.push(list_of_modules_taken_y3s1[i].trim());
                    }
                }
                if (this.Y3S2_modules.length > 0) {
                    var list_of_modules_taken_y3s2 = this.Y3S2_modules.split(",");
                    for (i = 0; i < list_of_modules_taken_y3s2.length; i++) {
                        list_trimmed.push(list_of_modules_taken_y3s2[i].trim());
                    }
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
                for (i=0; i<this.modulesTaken.length; i++){
                    this.modulesThatCanBeTaken.push(this.modulesTaken[i].fulfillRequirements);

                }
                
            },
            removeDuplicateModules: async function(){
                console.log(this.selectedFaculty);
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
                    if (this.selectedFaculty == "All") {
                        if (this.selectedSemester == "Both"){
                            temp += "<tr>";
                            temp += "<td>" + arrayOfMods[n] + "</td>";
                            temp += "<td>" + this.finalJson[arrayOfMods[n]]['title'] + "</td>";
                            temp += "<td>" + this.finalJson[arrayOfMods[n]]['faculty'] + "</td>";
                            temp += "<td>" + this.getSemesterFromModule(this.finalJson[arrayOfMods[n]]) + "</td>";
                            temp += "<td>" + this.finalJson[arrayOfMods[n]]['description'] + "</td></tr>";
                        }
                        else {
                            if (this.selectedSemester == this.getSemesterFromModule(this.finalJson[arrayOfMods[n]])){
                                temp += "<tr>";
                                temp += "<td>" + arrayOfMods[n] + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['title'] + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['faculty'] + "</td>";
                                temp += "<td>" + this.getSemesterFromModule(this.finalJson[arrayOfMods[n]]) + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['description'] + "</td></tr>";
                            }
                        }
                    }
                    else {
                        if (this.finalJson[arrayOfMods[n]]['faculty'] == this.selectedFaculty) {
                            if (this.selectedSemester == this.getSemesterFromModule(this.finalJson[arrayOfMods[n]])) {
                                temp += "<tr>";
                                temp += "<td>" + arrayOfMods[n] + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['title'] + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['faculty'] + "</td>";
                                temp += "<td>" + this.getSemesterFromModule(this.finalJson[arrayOfMods[n]]) + "</td>";
                                temp += "<td>" + this.finalJson[arrayOfMods[n]]['description'] + "</td></tr>";
                            }
                        }
                    }
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
                    return "Both";
                }
                if (moduleSemInfo.length == 0){
                    return "Unavailable";
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
    width: 90%;
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