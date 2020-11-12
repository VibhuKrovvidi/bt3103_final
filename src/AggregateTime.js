import {Bar} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Bar,
    data: function() {
        return {
            datacollection: {
                labels: ["Work","Social","Exercise","Sleep"],
                datasets: [{
                    label: "Average number of hours",
                    backgroundColor: "navy",
                    data: [0,0,0,0]
                }]
            },
            options: {
                legend: {
                    display: true,
                    /*
                    labels: {
                        filter: ((legendItem, data) => data.datasets[0].data[legendItem.index] != 0),
                        fontSize: 15,
                        }
                        */
                    },
                    

                title: {
                    display: true,
                    text: "Average Time Spent Across Users",
                    fontSize: 14
                    
                },
                layout:{
                    padding:{
                        left:5,
                        right:0,
                        top:0,
                        bottom:0
                    }
                },
                
                /*
                tooltips: {
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.labels[tooltipItem.index]}: ${Math.round(data.datasets[0].data[tooltipItem.index])} Users`;
                        }
                    }
                },
                */

                responsive: true,
                maintainAspectRatio: false
            },
        }
    },

    methods: {
        fetchItems: async function() {
            let fin = new Array()
            //Compute Average for EACH USER first
            let getBase = await (
            database.collection("users").get().then((qss1) => {
                qss1.forEach(doc1 => {
                    database.collection("users").doc(doc1.id).collection("time").get().then((qss2) => {
                        if (!qss2.empty) {
                            let work = 0
                            let soc = 0
                            let exe = 0
                            let slp = 0
                            let dates = new Set()
                            qss2.forEach(doc => {
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
                            })
                            let denom = dates.size
                            let res = [work,soc,exe,slp].map(function(x) { return x/denom; })
                            fin.push(res)
                        }
                    })
                })
            }))
            console.log(getBase)
            let c = 0
            let getData = await (
            //Aggregate average across all user's average
            database.collection("users").get().then((qss1) => {
                qss1.forEach(doc1 => {
                    database.collection("users").doc(doc1.id).collection("time").get().then((qss2) => {
                        if (!qss2.empty) {
                            this.datacollection.datasets[0].data[0] += fin[c][0]*(1/fin.length)
                            this.datacollection.datasets[0].data[1] += fin[c][1]*(1/fin.length)
                            this.datacollection.datasets[0].data[2] += fin[c][2]*(1/fin.length)
                            this.datacollection.datasets[0].data[3] += fin[c][3]*(1/fin.length)
                            c++
                        }
                        this.renderChart(this.datacollection, this.options)
                    })
                })
            }))
            console.log(getData)
        }
    },  

    created(){
        this.fetchItems()
    }
}

