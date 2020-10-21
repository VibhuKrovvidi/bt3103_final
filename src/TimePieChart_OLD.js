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
        /*fetchItems: function() {
            database.collection('time').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    this.datacollection.labels.push(doc.data().category)
                    this.datacollection.datasets[0].data.push(doc.data().hours)
                })
                this.renderChart(this.datacollection, this.options)
            })
        }*/
        fetchItems: function() {
            database.collection('time').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().nusnet == this.iden) {
                        let curr = doc.data()
                        let label = curr.category
                        let idx = this.categories.indexOf(label)
                        //conversion to minutes
                        let end = (curr.end%100) + (Math.floor(curr.end/100)*60)
                        let start = (curr.start%100) + (Math.floor(curr.start/100)*60)
                        //conversion to hours
                        let currSum = (((end-start)/60))
                        if (idx == '-1') {
                            this.categories.push(curr.category)
                            this.agg.push(currSum)
                        } else {
                            this.agg[idx] += currSum
                        }
                    }
                })
            })
        },
    },

    created(){
        this.fetchItems()
    }
}
