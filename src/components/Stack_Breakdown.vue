<template>
<div id=stack>
    <h3 id=intro> Here is a breakdown and analysis of your time spent.</h3>
    <div id=column>
        <div id=chart>
            <tdypie v-if="tdy"></tdypie>
            <weekpie v-if="wk"></weekpie>
            <monthpie v-if="mth"></monthpie>
        </div>
        <button v-on:click="tdyslice"> Today </button>
        <div class="divider"/>
        <button v-on:click="weekslice"> Past Week </button>
        <div class="divider"/>
        <button v-on:click="monthslice"> Past Month </button>

        <div id=right_seg>
            <div id=data>
                <h4> Summary <br> (Rounded Hours) </h4>
                <ul>
                <li  v-for="cat in categories" v-bind:key="cat">
                    <h3>  {{cat}} <span id=circle> {{Math.ceil(agg[categories.indexOf(cat)])}} hours</span> </h3>
                </li>
                </ul>
            </div>
            <div id=insights>
                <h2>Insights</h2>
                <h4 v-show="!(this.total==0)">You’ve have spent {{Math.round(this.agg[0]*100/this.total)}}% on work and 
                {{Math.round(this.agg[3]*100/this.total)}}% on sleep.
                </h4>
                <h3 id=recommend>{{this.rec()}}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'
import tdypie from '../Time_PieChart_Today.js'
import weekpie from '../Time_PieChart_Week.js'
import monthpie from '../Time_PieChart_Month.js'

export default {
    components: {
        tdypie, weekpie, monthpie
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            tdy: false,
            wk: false,
            mth: false,
            categories: [],
            agg: [],
            total: 0,
        }
    },

    methods: {
        tdyslice: function() {
            //reset
            this.categories = ["Work","Social","Exercise","Sleep","Idle","Others"]
            this.agg = [0,0,0,0,0,0]
            this.tdy = true
            this.wk = false
            this.mth = false
            this.total = 0
            //getting today's date value
            let today = new Date()
            let tdy = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            //collecting data
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().date == tdy) {
                        let curr = doc.data()
                        let label = curr.category
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (label == "work") {
                            this.agg[0] += currSum
                        } else if (label == "social") {
                            this.agg[1] += currSum
                        } else if (label == "exercise") {
                            this.agg[2] += currSum
                        } else if (label == "sleep") {
                            this.agg[3] += currSum
                        } else if (label == "idle") {
                            this.agg[4] += currSum
                        } else {
                            this.agg[5] += currSum
                        }
                        this.total += currSum
                        //console.log(this.agg)
                    }
                })
            })
        },
        weekslice: function() {
            //reset
            this.categories = ["Work","Social","Exercise","Sleep","Idle","Others"]
            this.agg = [0,0,0,0,0,0]
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
            //collecting data
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        let label = curr.category
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (label == "work") {
                            this.agg[0] += currSum
                        } else if (label == "social") {
                            this.agg[1] += currSum
                        } else if (label == "exercise") {
                            this.agg[2] += currSum
                        } else if (label == "sleep") {
                            this.agg[3] += currSum
                        } else if (label == "idle") {
                            this.agg[4] += currSum
                        } else {
                            this.agg[5] += currSum
                        }
                        this.total += currSum
                        //console.log(this.agg)
                    }
                })
            })
        },
        monthslice: function() {
            //reset
            this.categories = ["Work","Social","Exercise","Sleep","Idle","Others"]
            this.agg = [0,0,0,0,0,0]
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
            //collecting data
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        let label = curr.category
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (label == "work") {
                            this.agg[0] += currSum
                        } else if (label == "social") {
                            this.agg[1] += currSum
                        } else if (label == "exercise") {
                            this.agg[2] += currSum
                        } else if (label == "sleep") {
                            this.agg[3] += currSum
                        } else if (label == "idle") {
                            this.agg[4] += currSum
                        } else {
                            this.agg[5] += currSum
                        }
                        this.total += currSum
                        //console.log(this.agg)
                    }
                })
            })
        },
        /*
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
        },*/
        rec: function() {
            let wk = Math.round(this.agg[0]*100/this.total)
            let slp = Math.round(this.agg[3]*100/this.total)
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
</style>
