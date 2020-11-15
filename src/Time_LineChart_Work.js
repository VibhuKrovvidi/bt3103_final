import {Line} from 'vue-chartjs'
import database from './firebase.js'
import firebase from 'firebase'
//import Vue from 'vue'

//supress deep watcher inf loop warning: chartData is supposed to be busy waiting for changes by user
//Vue.config.silent = true

export default{
    extends:Line,
    data: function() {
        return {
            usr: firebase.auth().currentUser.email,
            total: 0,
            datacollection: {
                labels: ["0000","0100","0200","0300","0400","0500","0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300"],
                datasets: [{
                    backgroundColor: "darkturquoise",
                    borderColor: "darkturquoise",
                    data: [],
                    borderWidth: 0.5,
                    fill:true,
                    pointRadius:1,
                },
                {
                    data: [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],
                    fill: false,
                    pointRadius: 0,
                    borderColor: "brown",
                    borderWidth: 0.8,
                }
                ]
            },
            chartOptions: {
                legend: {
                    display: false,
                    },

                title: {
                    display: true,
                    text: ["Time Spent Distribution","No Data"],
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
                scales: {
                    yAxes: [{
                        ticks:{
                            min: 0,
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
                this.datacollection.datasets[0].data = res
                if (this.total != 0) {
                    this.chartOptions.title.text = ["Time Spent Distribution","Average work over the past week"]
                    this.renderChart(this.datacollection, this.chartOptions)
                } else {
                    this.chartOptions.title.text = ["Time Spent Distribution","No Data"]
                    this.renderChart(this.datacollection, this.chartOptions)
                }
            })
        }
    },
    created(){
        this.fetchItems()
    },
    //watcher to render chart reactively to chartData changes (infinite loop warning)
    //crashes the site upon deployment (only usable in serves testing)
    /*watch: {
        chartData: {
            handler: function() {
                this.renderChart(this.chartData, this.options)
            },
            //labels and data are deep inside chartData hence need watch deep elements!
            deep: true,
        }
    }*/
}

