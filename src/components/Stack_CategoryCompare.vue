<template>
<div id=stack>
    <h3 id=intro> Here is a comparison with MySID's recommendations.</h3>
    <div id=column>
        <div id=chart>
            <tdybar v-if="tdy"></tdybar>
            <weekbar v-if="wk"></weekbar>
            <monthbar v-if="mth"></monthbar>
        </div>
        <div id=warn v-show="warn()">
            <h4> 
            *Comparison may be inaccurate. Try logging more events in the selected period to get a more accurate comparison. 
            </h4>
        </div>
        <button v-on:click="tdyslice"> Today </button>
        <div class="divider"/>
        <button v-on:click="weekslice"> Past Week </button>
        <div class="divider"/>
        <button v-on:click="monthslice"> Past Month </button>

        <div id=right_seg>
            <div id=data>
                <h4> Difference from Recommendations <br> (Rounded Nett Differences) </h4>
                <ul>
                <li  v-for="lab in labs" v-bind:key="lab">
                    <h3>  {{lab}} <span id=circle> {{diff_txt[labs.indexOf(lab)]}}</span> </h3>
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
import database from '../firebase.js'
import firebase from 'firebase'
import tdybar from '../Time_GroupedBar_Today.js'
import weekbar from '../Time_GroupedBar_Week.js'
import monthbar from '../Time_GroupedBar_Month.js'


export default {
    components: {
        tdybar, weekbar, monthbar
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            tdy: true,
            wk: true,
            mth: true,
            total: 0,
            msrec: [7.5,1.5,0.5,6],
            labs: ["Work","Social","Exercise","Sleep"],
            diff_txt: [],
            diff_val: [],
            agg: [],
        }
    },

    methods: {
        tdyslice: function() {
            //reset
            this.diff_txt = []
            this.diff_val=[]
            this.agg = []
            this.tdy = true
            this.wk = false
            this.mth = false
            this.total = 0
            //getting today's date value
            let today = new Date()
            let tdy = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date == tdy) {
                        let curr = doc.data()
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            this.total++
                            dates.add(curr.date)
                            work += currSum
                        } else if (curr.category == "social") {
                            this.total++
                            dates.add(curr.date)
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            this.total++
                            dates.add(curr.date)
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            this.total++
                            dates.add(curr.date)
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                if (denom == 0) {
                    this.agg = [0,0,0,0]
                } else {
                    this.agg = [work,soc,exe,slp].map(function(x) { return x/denom; })
                }
                this.getDiff()
            })
        },
        weekslice: function() {
            //reset
            this.diff_txt = []
            this.diff_val=[]
            this.agg = []
            this.tdy = false
            this.wk = true
            this.mth = false
            this.total = 0
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            this.total++
                            dates.add(curr.date)
                            work += currSum
                        } else if (curr.category == "social") {
                            this.total++
                            dates.add(curr.date)
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            this.total++
                            dates.add(curr.date)
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            this.total++
                            dates.add(curr.date)
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                if (denom == 0) {
                    this.agg = [0,0,0,0]
                } else {
                    this.agg = [work,soc,exe,slp].map(function(x) { return x/denom; })
                }
                this.getDiff()
            })
        }, 
        monthslice: function() {
            //reset
            this.diff_txt = []
            this.diff_val=[]
            this.agg = []
            this.tdy = false
            this.wk = false
            this.mth = true
            this.total = 0
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-28)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let work = 0
                let soc = 0
                let exe = 0
                let slp = 0
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (curr.category == "work") {
                            this.total++
                            dates.add(curr.date)
                            work += currSum
                        } else if (curr.category == "social") {
                            this.total++
                            dates.add(curr.date)
                            soc += currSum
                        } else if (curr.category == "exercise") {
                            this.total++
                            dates.add(curr.date)
                            exe += currSum
                        } else if (curr.category == "sleep") {
                            this.total++
                            dates.add(curr.date)
                            slp += currSum
                        }
                    }
                })
                let denom = dates.size
                if (denom == 0) {
                    this.agg = [0,0,0,0]
                } else {
                    this.agg = [work,soc,exe,slp].map(function(x) { return x/denom; })
                }
                this.getDiff()
            })
        },
        getDiff: function() {
            let a1 = this.agg
            let a2 = this.msrec
            let dt = a1.map(function (num, idx) {return Math.round(num - a2[idx]);});
            this.diff_val = dt


            let dtxt = dt.map(function(x, i) {
                if (a1[i] == 0) {
                    return "No Data"
                } else {
                    let temp = Math.round(x)
                    if (temp<0) {
                        temp *= -1
                        return "-" + temp.toString() + " Hours";
                    } else if (temp == 0) {
                        return temp.toString() + " Hours";
                    } else {
                        return "+" + temp.toString() + " Hours";
                    }
                }
            });
            this.diff_txt = dtxt
        },
        warn: function() {
            if (this.total != 0) {
                let d = this.agg
                let curr = d.reduce((x,y) => x+y,0)
                return (curr <= 7)  //users should log a reasonable amount of events
                                    //to make reasonable comparisons
            }
        },
        rec1: function() {
            let arr = this.diff_val
            let t = this.diff_txt
            if (arr[0]>0 || (arr[1]<0 && t[1] != "No Data") || (arr[2]<0 && t[2] != "No Data") || (arr[3]<0 && t[3] != "No Data")) {
                return "Your categories could benefit from some reblancing to meet MySID's recommendations!"
            } else if (this.total == 0) {
                return "Log your schedule to receive inisghts!"
            } else {
                return "Your categories are within our recommendations!"
            }
        },
        rec2: function() {
            if (this.total == 0) {
                return "Log your schedule to receive inisghts!"
            } else {
                let s = this.diff_val
                let t = this.diff_txt
                if (s[0] > 0) {
                    let txt = "Try to reduce workload. " 
                    if ((s[1] < 0 && t[1] != "No Data") || (s[2] < 0 && t[2] != "No Data") || (s[3] < 0 && t[3] != "No Data")) {
                        txt += "Try to increase "
                    }
                    if (s[1] < 0 && t[1] != "No Data") {
                        txt += ", social activity"
                    }
                    if (s[2] < 0 && t[2] != "No Data") {
                        txt += ", exercise"
                    }
                    if (s[3] < 0 && t[3] != "No Data") {
                        txt += ", sleep"
                    }
                    if ((s[1] < 0 && t[1] != "No Data") || (s[2] < 0 && t[2] != "No Data") || (s[3] < 0 && t[3] != "No Data")) {
                        txt += "."
                    }
                    return txt
                } else {
                    let txt = ""
                    if ((s[1] < 0 && t[1] != "No Data") || (s[2] < 0 && t[2] != "No Data") || (s[3] < 0 && t[3] != "No Data")) {
                        txt += "Try to increase"
                    }
                    if (s[1] < 0 && t[1] != "No Data") {
                        txt += ", social activity"
                    }
                    if (s[2] < 0 && t[2] != "No Data") {
                        txt += ", exercise"
                    }
                    if (s[3] < 0 && t[3] != "No Data") {
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
        this.weekslice()
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
        padding: 1%;
        float:left;
        width:40%;
    }

    #data {
        float: left;
        width:25%;
        padding:1%;
    }

    ul {
        /*
        padding-top: 20px;
        padding-bottom: 20px;
        */
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
        width: 15%;
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
        width:1%;
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
        padding: 1%;
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

    #warn {
        color: brown;
    }
</style>
