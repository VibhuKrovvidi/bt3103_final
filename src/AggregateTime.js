import {Bar} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Bar,
    data: function() {
        return {
            datacollection: {
                labels: ["Work","Social","Exercise","Sleep"],
                datasets: [{
                    label: "total number of hours",
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
                    text: "Aggregate Time Spent",
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
        fetchItems: function() {
            database.collection("users").get().then((qss1) => {
                qss1.forEach(doc1 => {
                    database.collection("users").doc(doc1.id).collection("time").get().then((qss2) => {
                        qss2.forEach(doc2 => {
                            let cat = doc2.data().category
                            let curr = doc2.data()

                            //conversion to minutes
                            let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                            let start = (curr.start%100) + (Math.floor(curr.start/100)*60)

                            //conversion to hours
                            let duration = (((end-start)/60))
                            console.log(this.datacollection.datasets[0].data)

                            if (cat == "work") {
                                this.datacollection.datasets[0].data[0] += duration
                            } else if (cat == "social") {
                                this.datacollection.datasets[0].data[1] += duration
                            } else if (cat == "exercise") {
                                this.datacollection.datasets[0].data[2] += duration
                            } else if (cat == "sleep") {
                                this.datacollection.datasets[0].data[3] += duration
                            }
                        })
                        this.renderChart(this.datacollection, this.options)
                    })
                })
            })
        }
    },

    created(){
        this.fetchItems()
    }
}

