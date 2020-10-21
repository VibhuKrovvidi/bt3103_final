import {Pie} from 'vue-chartjs'

export default{
    extends: Pie,
    props: ['chartdata'],
    data: function() {
        return {
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
            },
        }
    },

    methods: {
    },

    mounted(){
        this.renderChart(this.chartdata, this.options)
    }
}
