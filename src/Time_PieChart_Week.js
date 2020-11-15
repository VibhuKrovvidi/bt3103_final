import {Pie} from 'vue-chartjs'
import database from './firebase.js'
import firebase from 'firebase'
//import Vue from 'vue'

//supress deep watcher inf loop warning: chartData is supposed to be busy waiting for changes by user
//Vue.config.silent = true

export default{
    extends: Pie,
    data: function() {
        return {
            usr: firebase.auth().currentUser.email,
            total: 0,
            form: {
                label(tooltipItem, data) {
                    return `${data.labels[tooltipItem.index]}: ${Math.ceil(data.datasets[0].data[tooltipItem.index])} Hours`;
                }
            },
            dummy: {
                label(tooltipItem, data) {
                    return `${data.labels[tooltipItem.index]}: No Data`;
                }
            },
            datacollection: {
                labels: ["Work","Social","Exercise","Sleep","Idle","Others"],
                datasets: [{
                    backgroundColor: [],
                    data: [0,0,0,0,0,0],
                    borderWidth: 0.5
                }]
            },
            chartOptions: {
                legend: {
                    display: true,
                    labels: {
                        filter: ((legendItem, data) => data.datasets[0].data[legendItem.index] != 0),
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
        fetchItems: function() {
            //getting today's date value
            let today = new Date()
            let last = new Date()
            last.setDate(last.getDate()-7)
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = (last.getFullYear()*10000) + ((last.getMonth()+1)*100) + last.getDate()
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
                            this.datacollection.datasets[0].data[0] += currSum
                        } else if (label == "social") {
                            this.datacollection.datasets[0].data[1] += currSum
                        } else if (label == "exercise") {
                            this.datacollection.datasets[0].data[2] += currSum
                        } else if (label == "sleep") {
                            this.datacollection.datasets[0].data[3] += currSum
                        } else if (label == "idle") {
                            this.datacollection.datasets[0].data[4] += currSum
                        } else {
                            this.datacollection.datasets[0].data[5] += currSum
                        }
                        this.total += currSum
                    }
                })
                if (this.total != 0) {
                    this.chartOptions.title.text = ["Time Spent Breakdown","(Past Week)"]
                    this.datacollection.datasets[0].backgroundColor = ['navy', '#0D47A1', '#1976D2', '#2196F3', '#90CAF9', '#E3F2FD']
                    this.chartOptions.tooltips.callbacks = this.form
                    this.renderChart(this.datacollection, this.chartOptions)
                } else {
                    this.chartOptions.title.text = ["Time Spent Breakdown","No Data for Past Week"]
                    this.datacollection.datasets[0].data = [1,1,1,1,1,1]
                    this.datacollection.labels = ["","","","","",""]
                    this.datacollection.datasets[0].backgroundColor = []
                    this.chartOptions.tooltips.callbacks = this.dummy
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
    }*/
}

