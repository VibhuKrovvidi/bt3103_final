import {Pie} from 'vue-chartjs'

export default{
    extends: Pie,
    props: ['chartData'],
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
        this.renderChart(this.chartData, this.options)
    },
    //watcher to render chart reactively to chartData changes (infinite loop warning)
    watch: {
        chartData: {
            handler: function() {
                this.renderChart(this.chartData, this.options)
            },
            //labels and data are deep inside chartData hence need watch deep elements!
            deep: true,
        }
    }
}
