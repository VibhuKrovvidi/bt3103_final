import {Pie} from 'vue-chartjs'
import database from './firebase.js'

export default{
    extends: Pie,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise'],
                    data: [],
                    borderWidth: 0.5
                }]
            },

            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 15,
                        }
                    },

                title: {
                    display: true,
                    text: "Time Spent",
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

                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('time').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    this.datacollection.labels.push(doc.data().category)
                    this.datacollection.datasets[0].data.push(doc.data().hours)
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created(){
        this.fetchItems()
    }
}
