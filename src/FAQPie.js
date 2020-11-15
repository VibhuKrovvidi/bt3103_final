import {Pie} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Pie,
    data: function() {
        return {
            datacollection: {
                labels: ["Zoning","Health","Residential","Student Services","Others"],
                datasets: [{
                    backgroundColor: ['#EF7C00', '#F39C12', '#F5B041', '#F8C471', '#FDEBD0'],
                    data: [0,0,0,0,0],
                    borderWidth: 1,
                },
                ],
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
                    text: "Breakdown of Posted FAQs By Category",
                    fontSize: 16
                    
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
            database.collection("FAQ").get().then((qss1) => {
                qss1.forEach(doc1 => {
                            let curr = doc1.data().category
                            
                            if (curr == "zoning") {
                                this.datacollection.datasets[0].data[0] += 1
                            } else if (curr == "health") {
                                this.datacollection.datasets[0].data[1] += 1
                            } else if (curr == "residential") {
                                this.datacollection.datasets[0].data[2] += 1
                            } else if (curr == "studentServices") {
                                this.datacollection.datasets[0].data[3] += 1
                            } else if (curr == "others") {
                                this.datacollection.datasets[0].data[4] += 1
                            }


                        })
                        this.renderChart(this.datacollection, this.options)
                    })
                
           
        }
    },

    created(){
        this.fetchItems()
    }
}
