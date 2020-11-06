<template>
<div id=stack>
    <h3 id=intro> Here is a comparison with MySID's recommendations.</h3>
    <div id=column>
        <div id=chart>
            <groupedbar v-bind:chartData = "datacollection" :options = "chartOptions"></groupedbar>
        </div>
        <button v-on:click="weekslice"> Past Week </button>
        <div class="divider"/>
        <button v-on:click="monthslice"> Past Month </button>
        <div id=right_seg>
            <div id=data>
                <ul>
                <li  v-for="lab in labs" v-bind:key="lab">
                    <h3>  {{lab}} <span id=circle> {{diff_txt[labs.indexOf(lab)]}} hours</span> </h3>
                </li>
                </ul>
            </div>
            <div id=insights>
                <h2>Insights</h2>
                <h4 v-show="!(this.total==0)"> {{this.rec1()}}
                </h4>
                <h3 id=recommend>{{this.rec2()}}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import groupedbar from '../GroupedBar.js'
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    components: {
        groupedbar
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            mth31: [1,3,5,7,8,10,12],
            mth30: [4,6,9,11],
            total: 0,
            labs: [],
            diff_txt: [],
            diff_val: [],
            datacollection: {
                labels: ["Work","Social","Exercise","Sleep"],
                datasets: [
                    {
                        label: "Your Data",
                        data: [],
                        backgroundColor:"steelblue",
                    },
                    {
                        label: "MySID Recommended",
                        data: [7.5,1.5,0.5,6], // default & hardcoded as [7.5,1.5,0.5,6]
                        backgroundColor:"#948f8a",
                    }
                ]
            },
            chartOptions: {
                legend: {
                    display: true,
                    position: "bottom"
                },
                title: {
                    display: true,
                    text: "",
                    fontSize: 20,
                    fontColor: "black"
                    
                },
                layout:{
                    padding:{
                        left:5,
                        right:5,
                        top:0,
                        bottom:5
                    }
                },
                scales: {
                    yAxes: [{
                        ticks:{
                            min:0,
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },

    methods: {
        fetchItems: function() {
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
            //collect user's total
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        this.total++
                        let curr = doc.data()
                        dates.add(curr.date)
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            work += currSum
                        } else if (curr.category == "social") {
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                let res = [work,soc,exe,slp].map(function(x) { return x/denom; })
                this.datacollection.datasets[0].data = res
                if (this.total == 0) {
                    this.datacollection.datasets[1].data = []
                } else {
                    this.datacollection.datasets[1].data = [7.5,1.5,0.5,6]
                    this.getDiff()
                }
                this.chartOptions.title.text = "Week's Average"
            })
        },
        weekslice: function() {
            this.total=0
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
            //collect user's total
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        this.total++
                        let curr = doc.data()
                        dates.add(curr.date)
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            work += currSum
                        } else if (curr.category == "social") {
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                let res = [work,soc,exe,slp].map(function(x) { return x/denom; })
                this.datacollection.datasets[0].data = res
                this.getDiff()
                this.chartOptions.title.text = "Week's Average"
            })
        },
        monthslice: function() {
            this.total=0
            //getting today's date value
            let today = new Date()
            let y = (today.getFullYear())
            let m = (today.getMonth()+1)
            let d = today.getDate()
            let tdymax = y*10000 + m*100 + d
            if (m==1) {
                y = y-1
                m = 12
            }
            let tdymin = y*10000 + m*100 + d
            //collect user's total
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        this.total++
                        let curr = doc.data()
                        dates.add(curr.date)
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            work += currSum
                        } else if (curr.category == "social") {
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                let res = [work,soc,exe,slp].map(function(x) { return x/denom; })
                this.datacollection.datasets[0].data = res
                this.getDiff()
                this.chartOptions.title.text = "Month's Average"
            })
        },
        getDiff: function() {
            this.labs = ["Work","Social","Exercise","Sleep"]
            let a1 = this.datacollection.datasets[0].data
            let a2 = this.datacollection.datasets[1].data
            let dt = a1.map(function (num, idx) {return Math.round(num - a2[idx]);});
            this.diff_val = dt
            let dtxt = dt.map(function(x) {
                let temp = Math.round(x)
                if (temp<0) {
                    temp *= -1
                    return "-" + temp.toString();
                } else if (temp == 0) {
                    return temp.toString();
                } else {
                    return "+" + temp.toString();
                }
            });
            this.diff_txt = dtxt
        },
        rec1: function() {
            let arr = this.diff_val
            if (arr[0]!=0 || arr[1]!=0 || arr[2]!=0 || arr[3]!=0) {
                return "Your categories could benefit from some reblancing to meet MySID's recommendations!"
            } else if (this.total == 0) {
                return "Log your schedule to receive inisghts!"
            } else {
                return "Your categories are balanced!"
            }
        },
        rec2: function() {
            if (this.total == 0) {
                return "Log your schedule to receive inisghts!"
            } else {
                let s = this.diff_val
                if (s[0] > 0) {
                    let txt = "Try to reduce workload. " 
                    if (s[1] < 0 || s[2] < 0 || s[3] < 0) {
                        txt += "Try to increase "
                    }
                    if (s[1] < 0) {
                        txt += "social activity"
                    }
                    if (s[2] < 0) {
                        txt += ", exercise"
                    }
                    if (s[3] < 0) {
                        txt += ", sleep"
                    }
                    txt += "."
                    return txt
                } else {
                    let txt = ""
                    if (s[1] < 0 || s[2] < 0 || s[3] < 0) {
                        txt += "Try to increase"
                    }
                    if (s[1] < 0) {
                        txt += ", social activity"
                    }
                    if (s[2] < 0) {
                        txt += ", exercise"
                    }
                    if (s[3] < 0) {
                        txt += ", sleep"
                    }
                    if (txt == "") {
                        txt += "You are good to go!"
                    } else {
                        txt += "."
                    }
                    return txt
                }
            }
        },
    }, 
    created() {
        this.fetchItems()
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
