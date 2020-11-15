<template>
<div id=stack>
    <h3 id=intro> Here is an overview of your average timeload at different times of the day over the past week.</h3>
    <div id=column>
        <div id=chart>
            <workline v-if="wrk"></workline>
            <sleepline v-if="slp"></sleepline>
            <socline v-if="soc"></socline>
        </div>
        <div id=warn v-show="warn()">
            <h4> *You seem to have logged concurrent {{this.getCurrLab()}} events over the past week. </h4>
        </div>
        <button v-on:click="workslice"> Work </button>
        <div class="divider"/>
        <button v-on:click="sleepslice"> Sleep </button>
        <div class="divider"/>
        <button v-on:click="socialslice"> Social </button>

        <div id=right_seg>
            <div id=data>
                <h4> Timeload by period <br> (Rounded %) </h4>
                <ul>
                <li  v-for="period in summaryLab" v-bind:key="period">
                    <h3>  {{period}} <span id=circle> {{currSummary[summaryLab.indexOf(period)]}}%</span> </h3>
                </li>
                </ul>
            </div>
            <div id=insights>
                <h2>Insights</h2>
                <h4 v-show="!(this.total==0)"> 
                Your time spent on {{this.getCurrLab()}} peaks at {{this.bin[this.getPeakIdx()]}} hours.
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
import workline from '../Time_LineChart_Work.js'
import sleepline from '../Time_LineChart_Sleep.js'
import socline from '../Time_LineChart_Social.js'

export default {
    components: {
        workline, sleepline, socline
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            wrk: true,
            slp: true,
            soc: true,
            total: 0,
            currData: [],
            currSummary: [],
            summaryLab: ["0000 to 0600", "0600 to 1200", "1200 to 1800", "1800 to 0000"],
            bin: ["0000","0100","0200","0300","0400","0500","0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300"],
        }
    },

    methods: {
        workslice: function() {
            this.total = 0
            this.currSummary = []
            this.currData = []
            this.wrk = true
            this.slp = false
            this.soc = false
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let vals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        if (curr.category == "work") {
                            this.total++
                            dates.add(curr.date)
                            let strt_hr = Math.floor(curr.start/100)
                            let end_hr = Math.floor(curr.end/100)
                            let strt_min = curr.start%100
                            let end_min = curr.end%100
                            //first sum
                            vals[strt_hr] += 60 - strt_min
                            for (let i=strt_hr+1; i<=end_hr; i++) {
                                vals[i] += 60
                            }
                            vals[end_hr] -= 60 - end_min
                        }
                    }
                })
                let denom = dates.size
                let res = vals.map(function(x) { return Math.round(x/denom); })
                this.currData = res
                this.updateSummary()
            })
        },
        sleepslice: function() {
            this.total = 0
            this.currSummary = []
            this.currData = []
            this.wrk = false
            this.slp = true
            this.soc = false
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let vals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        if (curr.category == "sleep") {
                            this.total++
                            dates.add(curr.date)
                            let strt_hr = Math.floor(curr.start/100)
                            let end_hr = Math.floor(curr.end/100)
                            let strt_min = curr.start%100
                            let end_min = curr.end%100
                            //first sum
                            vals[strt_hr] += 60 - strt_min
                            for (let i=strt_hr+1; i<=end_hr; i++) {
                                vals[i] += 60
                            }
                            vals[end_hr] -= 60 - end_min
                        }
                    }
                })
                let denom = dates.size
                let res = vals.map(function(x) { return Math.round(x/denom); })
                this.currData = res
                this.updateSummary()
            })
        },
        socialslice: function() {
            this.total = 0
            this.currSummary = []
            this.currData = []
            this.wrk = false
            this.slp = false
            this.soc = true
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                let vals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                let dates = new Set()
                querySnapShot.forEach(doc => {
                    if (doc.data().date <= tdymax && doc.data().date >= tdymin) {
                        let curr = doc.data()
                        if (curr.category == "social") {
                            this.total++
                            dates.add(curr.date)
                            let strt_hr = Math.floor(curr.start/100)
                            let end_hr = Math.floor(curr.end/100)
                            let strt_min = curr.start%100
                            let end_min = curr.end%100
                            //first sum
                            vals[strt_hr] += 60 - strt_min
                            for (let i=strt_hr+1; i<=end_hr; i++) {
                                vals[i] += 60
                            }
                            vals[end_hr] -= 60 - end_min
                        }
                    }
                })
                let denom = dates.size
                let res = vals.map(function(x) { return Math.round(x/denom); })
                this.currData = res
                this.updateSummary()
            })
        },
        getCurrLab: function () {
            if (this.wrk) {
                return "work"
            } else if (this.slp) {
                return "sleep"
            } else if (this.soc) {
                return "social activity"
            }
        },
        updateSummary: function() {
            if (this.total == 0) {
                this.currSummary = [0,0,0,0]
            } else {
                let v = this.currData
                let v1 = Math.ceil(((v[0] + v[1] + v[2] + v[3] + v[4] + v[5])/360)*100)
                let v2 = Math.ceil(((v[6] + v[7] + v[8] + v[9] + v[10] + v[11])/360)*100)
                let v3 = Math.ceil(((v[12] + v[13] + v[14] + v[15] + v[16] + v[17])/360)*100)
                let v4 = Math.ceil(((v[18] + v[19] + v[20] + v[21] + v[22] + v[23])/360)*100)
                this.currSummary = [v1,v2,v3,v4]
            }
        },
        getPeakIdx: function() {
            let v = this.currData
            let maxIdx = 0
            let currMax = v[0]
            for (let i = 0; i<=23; i++) {
                if (v[i] > currMax) {
                    maxIdx = i
                    currMax = v[i]
                }
            }
            return maxIdx
        }, 
        warn: function() {
            let v  = this.currData
            let m = v[this.getPeakIdx()]
            return (m>60)
        },
        rec: function() {
            let v = this.currData
            let idx = this.getPeakIdx()
            if (this.total == 0) {
                return "Log some " + this.getCurrLab() + " events to receive inisghts!"
            } else if (this.wrk) {
                //Logic: Normal people should not be working through the night
                //Mean work hours from 0000 to 0500 should not be >= 30% of an individual's peak
                let nightWork = (v[0] + v[1] + v[2] + v[3] + v[4] + v[5])/6
                let percWk = nightWork/v[idx]
                if (percWk >= 0.30) {
                    return "You seem to be working late through the night, make sure you are getting sufficient rest!"
                } else {
                    let tot = this.currSummary.reduce((x,y) => x+y, 0)
                    //work should not be >= 40% of a day
                    if (tot >= 160) {
                        return "Your time spent on work seems a little high."
                    } else {
                        return "Your time spent on work seems reasonable."
                    }
                }
            } else if (this.slp) {
                //Logic: Most sleep should be clocked from 10pm to 10am
                let sum = v.reduce((x,y) => x+y,0)
                let nightSleep = (v[22] + v[23] + v[0] + v[1] + v[2] + v[3] + v[4] + v[5] + v[6] + v[7] + v[8] + v[9] + v[10])
                let percSlp = nightSleep/sum
                if (percSlp <= 0.80) {
                    return "Your circadian rhythm seems off. Take note of this if you have commitments in the morning!"
                } else {
                    return "Your circadian rhythm seems reasonable."
                }
            } else {
                let socSum = v.reduce((x,y) => x+y, 0)
                //an individual should spend on average 1 hour a day socialising
                if (socSum <= 60) {
                    return "Try to get out there and socialise!"
                } else {
                    return "Doing good! Remember to work hard and play harder! :)"
                }
            }
        },
    }, 
    created() {
        this.workslice()
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
        padding: 1%;
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
