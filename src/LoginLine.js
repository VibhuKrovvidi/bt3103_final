import {Line} from 'vue-chartjs'
import database from './firebase.js'

export default {
    extends:Line,
    data: () => ({
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of logins",
                borderColor: "#003D7C",
                data: []
            }]
        },

        options: {
            title: {
                display: true,
                text: "Number of logins per day",
                fontSize: 14
            },


            responsive: true,
            maintainAspectRatio: false
        }       
    }),

    methods: {
        fetchItems: function() {
            database.collection('login').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {                   
                    var date = doc.id
                    this.datacollection.labels.push(date)
                    this.datacollection.datasets[0].data.push(doc.data().count)
                    console.log(doc.data().count)

                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created() {
        this.fetchItems()
    }
}

