import {Line} from 'vue-chartjs'
import Vue from 'vue'

//supress deep watcher inf loop warning: chartData is supposed to be busy waiting for changes by user
Vue.config.silent = true

export default{
    extends:Line,
    props: ['chartData', 'options'],
    data: function() {
        return {
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

