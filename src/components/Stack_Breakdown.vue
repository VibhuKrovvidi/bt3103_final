<template>
<div id=stack>
    <h3 id=intro> Here is a breakdown and analysis of your time spent.</h3>
    <div id=column>
        <div id=chart>
            <piechart v-bind:chartData = "datacollection" :options = "chartOptions"></piechart>
        </div>

        <div v-show="dteSel">
        Enter Date (YYYYMMDD):
            <br>
            <input type="number" v-model.number="dateSelected" min="0" required/>
        </div>
        <button v-on:click="historical"> Historical </button>
        <div class="divider"/>
        <button v-on:click="showinput" v-show="!dteSel"> By Date </button>
        <button v-on:click="dateslice" v-show="dteSel"> Slice Date </button>
        <div class="divider"/>
        <button v-on:click="weekslice"> By Week </button>

        <div id=right_seg>
            <div id=data>
                <h4> Summary (hours) </h4>
                <ul>
                <li  v-for="cat in categories" v-bind:key="cat">
                    <h3>  {{cat}} <span id=circle> {{Math.ceil(agg[categories.indexOf(cat)])}} hours</span> </h3>
                </li>
                </ul>
            </div>
            <div id=insights>
                <h2>Insights</h2>
                <h4 v-show="!(this.total==0)">You’ve have spent {{Math.round(this.work*100/this.total)}}% on work and 
                {{Math.round(this.sleep*100/this.total)}}% on sleep.
                </h4>
                <h3 id=recommend>{{this.rec()}}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import piechart from '../PieChart.js'
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
            mth31: [1,3,5,7,8,10,12],
            mth30: [4,6,9,11],
            //counts for insights (cannot extract data from observer)
            total: 0,
            work: 0,
            sleep: 0,
            leisure: 0, //anything that is not work & sleep
            categories: [],
            agg: [],
            //callback pie label formats for with data & no data cases
            form: {
                label(tooltipItem, data) {
                    return `${data.labels[tooltipItem.index]}: ${Math.round(data.datasets[0].data[tooltipItem.index])} Hours`;
                }
            },
            dummy: {
                label(tooltipItem, data) {
                    return `${data.labels[tooltipItem.index]}: No Data`;
                }
            },
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey'],
                    data: [],
                    borderWidth: 0.5
                }]
            },
            chartOptions: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 15,
                        }
                    },

                title: {
                    display: true,
                    text: ["Time Spent Breakdown",""],
                    fontSize: 20,
                    
                },
                layout:{
                    padding:{
                        left:5,
                        right:0,
                        top:0,
                        bottom:0
                    }
                },
                tooltips: {
                    callbacks: {}
                    /*
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.labels[tooltipItem.index]}: ${Math.round(data.datasets[0].data[tooltipItem.index])} Hours`;
                        }
                    }*/
                },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },

    methods: {
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
                if (this.total != 0) {
                    this.chartOptions.title.text = ["Time Spent Breakdown","(Historical)"]
                    this.datacollection.datasets[0].data = this.agg
                    this.datacollection.labels = this.categories
                    this.datacollection.datasets[0].backgroundColor = ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey']
                    this.chartOptions.tooltips.callbacks = this.form
                } else {
                    this.chartOptions.title.text = ["Time Spent Breakdown","No Data"]
                    this.datacollection.datasets[0].data = [1,1,1,1,1,1]
                    this.datacollection.labels = ["","","","","",""]
                    this.datacollection.datasets[0].backgroundColor = []
                    this.chartOptions.tooltips.callbacks = this.dummy
                }
            })
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
                if (this.total != 0) {
                    this.chartOptions.title.text = ["Time Spent Breakdown","(Historical)"]
                    this.datacollection.datasets[0].data = this.agg
                    this.datacollection.labels = this.categories
                    this.datacollection.datasets[0].backgroundColor = ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey']
                    this.chartOptions.tooltips.callbacks = this.form
                } else {
                    this.chartOptions.title.text = ["Time Spent Breakdown","No Data"]
                    this.datacollection.datasets[0].data = [1,1,1,1,1,1]
                    this.datacollection.labels = ["","","","","",""]
                    this.datacollection.datasets[0].backgroundColor = []
                    this.chartOptions.tooltips.callbacks = this.dummy
                }
            })
        },
        dateslice: function() {
            //Data Validation
            if (this.dateSelected <= 19000101) { //minimum date 1900/01/01
                alert("Invalid Date!")
            } else if (this.dateSelected > 99999999 || this.dateSelected <= 9999999) {
                alert("Date must contain exactly 8 characters!")
            } else if (Math.floor((this.dateSelected%10000)/100) > 12) {
                alert("Month cannot be over 12!")
            } else if (this.mth31.includes((Math.floor(this.dateSelected/100))%100) && this.dateSelected%100 > 31) {
                alert("Invalid Date, Month only has 31 days!")
            } else if (this.mth30.includes((Math.floor(this.dateSelected/100))%100) && this.dateSelected%100 > 30) {
                alert("Invalid Date, Month only has 30 days!")
            } else if ((Math.floor(this.dateSelected/100))%100==2 && (Math.floor(this.dateSelected/10000))%4==0 && this.dateSelected%100 > 29) {
                alert("Invalid Date, Month only has 29 days!")
            } else if ((Math.floor(this.dateSelected/100))%100==2 && (Math.floor(this.dateSelected/10000))%4!=0 && this.dateSelected%100 > 28) {
                alert("Invalid Date, Month only has 28 days!")
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
                    if (this.total != 0) {
                        this.chartOptions.title.text = ["Time Spent Breakdown","(On " + this.dateSelected.toString()+")"]
                        this.datacollection.datasets[0].data = this.agg
                        this.datacollection.labels = this.categories
                        this.datacollection.datasets[0].backgroundColor = ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey']
                        this.chartOptions.tooltips.callbacks = this.form
                    } else {
                        this.chartOptions.title.text = ["Time Spent Breakdown","No Data for " +  this.dateSelected.toString()]
                        this.datacollection.datasets[0].data = [1,1,1,1,1,1]
                        this.datacollection.labels = ["","","","","",""]
                        this.datacollection.datasets[0].backgroundColor = []
                        this.chartOptions.tooltips.callbacks = this.dummy
                    }
                })
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
            let y = today.getFullYear()
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = 0
            if (today.getDate() >= 7) {
                tdymin = tdymax - 6
            } else {
                let m = today.getMonth()+1
                let prev_m = 0
                if (m==1) { //jan corner case
                    prev_m = 12
                    y = y-1
                } else {
                    prev_m = m-1
                }
                let dd = 6-today.getDate()
                if (this.mth31.includes(prev_m)) {
                    tdymin = (y*10000) + ((prev_m)*100) + (31-dd)
                } else if (this.mth30.includes(prev_m)) {
                    tdymin = (y*10000) + ((prev_m)*100) + (30-dd)
                } else {
                    tdymin = (y*10000) + ((prev_m)*100) + (28-dd)
                }
            }
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
                if (this.total != 0) {
                    this.chartOptions.title.text = ["Time Spent Breakdown","(Week)"]
                    this.datacollection.datasets[0].data = this.agg
                    this.datacollection.labels = this.categories
                    this.datacollection.datasets[0].backgroundColor = ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey']
                    this.chartOptions.tooltips.callbacks = this.form
                } else {
                    this.chartOptions.title.text = ["Time Spent Breakdown","No Data"]
                    this.datacollection.datasets[0].data = [1,1,1,1,1,1]
                    this.datacollection.labels = ["","","","","",""]
                    this.datacollection.datasets[0].backgroundColor = []
                    this.chartOptions.tooltips.callbacks = this.dummy
                }
            })
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
    /*
    #stack {
        border-style: solid;
        border-width: 1px;
        padding: 10px;
        border-radius: 16px;

    }*/

    #intro {
        text-align: left;

    }

    #column:after {
        content: "";
        display: table;
        clear: both;
    }

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

    .divider{
        width:20px;
        height:auto;
        display:inline-block;
    }

    #insights {
        float:left;
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
        padding: 10px;
    }

    #right_seg:after {
        content: "";
        display: table;
        clear: both;
    }
</style>
