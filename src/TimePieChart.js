import {Pie} from 'vue-chartjs'
import Vue from 'vue'

//supress deep watcher inf loop warning: chartData is supposed to be busy waiting for changes by user
Vue.config.silent = true

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
                tooltips: {
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.labels[tooltipItem.index]}: ${Math.round(data.datasets[0].data[tooltipItem.index])} Hours`;
                        }
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
