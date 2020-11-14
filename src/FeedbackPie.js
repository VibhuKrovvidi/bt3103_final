import {Pie} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Pie,
    data: function() {
        return {
            datacollection: {
                labels: ["Residential","Faculty","Activities","MySID","Others"],
                datasets: [{
                    backgroundColor: ['#76448A', '#9B59B6', '#C39BD3', '#D7BDE2', '#E8DAEF'],
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
                    text: "Breakdown of Feedback By Category",
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
            database.collection("feedback_forms").get().then((qss1) => {
                qss1.forEach(doc1 => {
                            let curr = doc1.data().category
                            
                            if (curr == "resid") {
                                this.datacollection.datasets[0].data[0] += 1
                            } else if (curr == "faculty") {
                                this.datacollection.datasets[0].data[1] += 1
                            } else if (curr == "activity") {
                                this.datacollection.datasets[0].data[2] += 1
                            } else if (curr == "mysid") {
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
