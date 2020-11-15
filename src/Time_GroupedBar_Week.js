import {Bar} from 'vue-chartjs'
import database from './firebase.js'
import firebase from 'firebase'
//import Vue from 'vue'

//supress deep watcher inf loop warning: chartData is supposed to be busy waiting for changes by user
//Vue.config.silent = true

export default{
    extends:Bar,
    props: ['chartData', 'options'],
    data: function() {
        return {
            usr: firebase.auth().currentUser.email,
            total: 0,
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
                        data: [], // default & hardcoded as [7.5,1.5,0.5,6]
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
                    text: [],
                    fontSize: 20,
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
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
            //collect user's total
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
                let res = [work,soc,exe,slp].map(function(x) { return x/denom; })
                let rec = [7.5,1.5,0.5,6]
                if (this.total == 0) {
                    this.datacollection.datasets[1].data = []
                    this.chartOptions.title.text = ["Time Spent Comparison","No Data for Past Week"]
                    this.renderChart(this.datacollection, this.chartOptions)
                } else {
                    this.datacollection.datasets[1].data = rec
                    this.datacollection.datasets[0].data = res
                    this.chartOptions.title.text = ["Time Spent Comparison","Week's Average"]
                    this.renderChart(this.datacollection, this.chartOptions)
                }
            })
        },
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
    }*/}

