<template>
    <div>
        <navi></navi>
        <h1> Time </h1>
        <h3> Good afternoon. Here is a breakdown and analysis of your time spent yesterday.</h3>

        <button v-on:click= "redirectToForm()"> Add Event</button>

        <div id=chart>
            <piechart v-bind:chartData = "datacollection"></piechart>
        </div>

        <div id=data>
            <ul>
                <li v-for="cat in categories" v-bind:key="cat">
                    <h3> {{cat}} <span id=circle> {{Math.round(agg[categories.indexOf(cat)])}} hours</span> </h3>
                </li>
            </ul>

            <br>

            <button v-on:click="historical"> Historical </button>
            <br> <br>
            <button v-on:click="showinput" v-show="!dteSel"> By Date </button>
            <div v-show="dteSel">
            Enter Date (YYYYMMDD): 
                <input type="number" v-model.number="dateSelected" min="0" required />
                <button v-on:click="dateslice"> Slice Date </button>
            </div>
            <br> <br>
            <button v-on:click="weekslice"> By Week </button>
        </div>

        <div id=sort>
            
        </div>

        <div id=insights>
            <h2>Insights</h2>
            <h4 v-show="!(this.total==0)">You’ve have spent {{Math.round(this.work*100/this.total)}}% on work and 
            {{Math.round(this.sleep*100/this.total)}}% on sleep.
            </h4>
            <h3 id=recommend>{{this.rec()}}</h3>
        </div>

    </div>
</template>

<script>
import piechart from '../TimePieChart.js'
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    components: {
        piechart
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            dteSel: false,
            dateSelected: '',
            //counts for insights (cannot extract data from observer)
            total: 0,
            work: 0,
            sleep: 0,
            leisure: 0, //anything that is not work & sleep
            categories: [],
            agg: [],
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey'],
                    data: [],
                    borderWidth: 0.5
                }]
            },
        }
    },

    methods: {

        redirectToForm() {
            this.$router.push({ path: '/time/form'});
        },
        showinput: function() {
            this.dteSel = !this.dteSel
        },
        fetchItems: function() {
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    let curr = doc.data()
                    let label = curr.category
                    let idx = this.categories.indexOf(label)
                    //conversion to minutes
                    let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                    let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                    //conversion to hours
                    let currSum = (((end-start)/60))
                    if (idx == '-1') {
                        this.categories.push(label)
                        this.agg.push(currSum)
                    } else {
                        this.agg[idx] += currSum
                    }
                    //data for recommendations
                    if (label == "work") {
                        this.total += currSum
                        this.work += currSum
                    } else if (label == "sleep") {
                        this.total += currSum
                        this.sleep += currSum
                    } else {
                        this.total += currSum
                        this.leisure += currSum
                    }
                })
            })
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
        historical: function() {
            this.categories = []
            this.agg = []
            this.total = 0
            this.sleep = 0
            this.leisure = 0
            this.work = 0
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    let curr = doc.data()
                    let label = curr.category
                    let idx = this.categories.indexOf(label)
                    //conversion to minutes
                    let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                    let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                    //conversion to hours
                    let currSum = (((end-start)/60))
                    if (idx == '-1') {
                        this.categories.push(label)
                        this.agg.push(currSum)
                    } else {
                        this.agg[idx] += currSum
                    }
                    //data for recommendations
                    if (label == "work") {
                        this.total += currSum
                        this.work += currSum
                    } else if (label == "sleep") {
                        this.total += currSum
                        this.sleep += currSum
                    } else {
                        this.total += currSum
                        this.leisure += currSum
                    }
                })
            })
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
        dateslice: function() {
            //Data Validation
            if (this.dateSelected <= 19000101) { //minimum date 1900/01/01
                alert("Invalid Date!")
            } else if (this.dateSelected > 99999999 || this.dateSelected <= 9999999) {
                alert("Date must contain exactly 8 characters!")
            } else if (Math.floor((this.dateSelected%10000)/100) > 12) {
                alert("Month cannot be over 12!")
            } else if (this.dateSelected%100 > 31) {
                alert("Day cannot be over 31!")
            } else {
                this.dteSel = !this.dteSel
                //reset
                this.categories = []
                this.agg = []
                this.total = 0
                this.sleep = 0
                this.leisure = 0
                this.work = 0
                //getting today's date value
                database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                    querySnapShot.forEach(doc => {
                        if (doc.data().date == this.dateSelected) {
                            let curr = doc.data()
                            let label = curr.category
                            let idx = this.categories.indexOf(label)
                            //conversion to minutes
                            let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                            let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                            //conversion to hours
                            let currSum = (((end-start)/60))
                            if (idx == '-1') {
                                this.categories.push(label)
                                this.agg.push(currSum)
                            } else {
                                this.agg[idx] += currSum
                            }
                            //data for recommendations
                            if (label == "work") {
                                this.total += currSum
                                this.work += currSum
                            } else if (label == "sleep") {
                                this.total += currSum
                                this.sleep += currSum
                            } else {
                                this.total += currSum
                                this.leisure += currSum
                            }
                        }
                    })
                })
                this.datacollection.datasets[0].data = this.agg
                this.datacollection.labels = this.categories
            }
        },
        weekslice: function() {
            //reset
            this.categories = []
            this.agg = []
            this.total = 0
            this.sleep = 0
            this.leisure = 0
            this.work = 0
            //getting today's date value
            let today = new Date()
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = tdymax - 7
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        let label = curr.category
                        let idx = this.categories.indexOf(label)
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (idx == '-1') {
                            this.categories.push(label)
                            this.agg.push(currSum)
                        } else {
                            this.agg[idx] += currSum
                        }
                        //data for recommendations
                        if (label == "work") {
                            this.total += currSum
                            this.work += currSum
                        } else if (label == "sleep") {
                            this.total += currSum
                            this.sleep += currSum
                        } else {
                            this.total += currSum
                            this.leisure += currSum
                        }
                    }
                })
            })
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
        rec: function() {
            //An individual should sleep at least 6hrs (25%)
            //Work should not exceed 10hours (41%)
            let wk = Math.round(this.work*100/this.total)
            let slp = Math.round(this.sleep*100/this.total)
            if (wk >= 40) {
                if (slp < 25) {
                    return "Try to reduce work and improve sleep!"
                } else {
                    return "Try to reduce work!"
                }
            } else if (slp < 25) {
                return "Try to improve sleep!"
            } else if (this.total == 0) {
                return "Log your schedule to receive inisghts!"
            } else {
                return "You are good to go!"
            }
        },
    }, 
    created() {
        this.fetchItems() 
        var tdy = new Date()
        var yr = tdy.getFullYear()*10000
        var mth = (tdy.getMonth()+1)*100
        var day = (tdy.getDate())
        var final = yr+mth+day
        this.dateSelected = final
    },
}

</script>

<style scoped>
#chart {
    padding:20px;
    float:left;
    width:40%;
}

#data {
    float: left;
    width:20%;
    padding:20px;
}

ul {
    border-style: dotted;
    border-width: 2px;
    list-style-type: none;
    text-align: left;
}

#circle {
  width: 80px;
  height: 30px;
  line-height: 30px;
  float: center;
  border-radius: 15px;
  font-size: 15px;
  color: #fff;
  margin-right: 30px;
  float:right;
  text-align: center;
  background: #000;
}

button {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 20px;
        text-align:'center';
        width: 200px;
        height: 50px;
        background: orange;
        color: white;
        background-color: #EF7C00;
        border-radius: 4px;
        float: center;
    }

button:hover {
    background-color: orangered;
}

#insights {
    float:right;
    width:25%;
    position: relative;
    margin-top: 30px;
    margin-right: 30px;
    border-radius: 16px;
    padding: 20px;
    color: white;
    background-color: #EF7C00;
}

#recommend {
    border-style: solid;
    border-width: 1px;
    padding: 10px
}

</style>

