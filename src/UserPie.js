import {Pie} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Pie,
    data: function() {
        return {
            datacollection: {
                labels: ["Zone A","Zone B","Zone C","Zone D","Zone E"],
                datasets: [{
                    backgroundColor: ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey'],
                    data: [0,0,0,0,0],
                    borderWidth: 0.5,
                }],
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        filter: ((legendItem, data) => data.datasets[0].data[legendItem.index] != 0),
                        fontSize: 15,
                        }
                    },

                title: {
                    display: true,
                    text: ["Breakdown of Activity Zones"],
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
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.labels[tooltipItem.index]}: ${Math.round(data.datasets[0].data[tooltipItem.index])} Users`;
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },

    methods: {
        fetchItems: function() {
            database.collection("users").get().then((qss1) => {
                qss1.forEach(doc1 => {
                    database.collection("users").doc(doc1.id).collection("profile").get().then((qss2) => {
                        qss2.forEach(doc2 => {
                            let curr = doc2.data().act_zone
                            if (curr == "A") {
                                this.datacollection.datasets[0].data[0] += 1
                            } else if (curr == "B") {
                                this.datacollection.datasets[0].data[1] += 1
                            } else if (curr == "C") {
                                this.datacollection.datasets[0].data[2] += 1
                            } else if (curr == "D") {
                                this.datacollection.datasets[0].data[3] += 1
                            } else if (curr == "E") {
                                this.datacollection.datasets[0].data[4] += 1
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

