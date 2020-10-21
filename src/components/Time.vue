<template>
    <div>
        <h1> Time </h1>
        <h3> Good afternoon. Here is a breakdown and analysis of your time spent yesterday.</h3>

        <div id=chart>
            <piechart></piechart>
        </div>

        <div id=data>
            <ul>
                <li v-for="item in items" v-bind:key="item.category">
                    <h3>{{item.category}} <span id=circle>{{item.hours}} hours</span></h3>
                </li>                
            </ul>

            <br>

            <button> By Date </button>
            <br> <br>
            <button> By Week </button>
        </div>

        <div id=sort>
            
        </div>

        <div id=insights>
            <h2>Insights</h2>
            <h4>For the past one week, you’ve have spent 75% on work, left the house 2 times and slept an average of 7.1 hours a month. </h4>
            <h3 id=recommend>Improve Sleep</h3>
        </div>

    </div>


</template>

<script>

import piechart from '../TimePieChart.js'
import database from '../firebase.js'

export default {
    components: {
        piechart
    },

    data(){
        return {
            items:[]
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('time').get().then((querySnapShot)=>{
                let item = {}
                querySnapShot.forEach(doc=> {
                    item=doc.data()
                    this.items.push(item)
                })
            })
        }
    },

    created() {
        this.fetchItems()
    }
    
}
</script>

<style scoped>
#chart {
    padding:20px;
    float:left;
    width:40%;
}

#data {
    float: left;
    width:20%;
    padding:20px;
}

ul {
    border-style: dotted;
    border-width: 2px;
    list-style-type: none;
    text-align: left;

}

#circle {
  width: 80px;
  height: 30px;
  line-height: 30px;
  float: center;
  border-radius: 15px;
  font-size: 15px;
  color: #fff;
  margin-right: 30px;
  float:right;
  text-align: center;
  background: #000;
}

button {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 20px;
        text-align:'center';
        width: 200px;
        height: 50px;
        background: orange;
        color: white;
        background-color: #EF7C00;
        border-radius: 4px;
        float: center;
    }

button:hover {
    background-color: orangered;
}

#insights {
    float:right;
    width:25%;
    position: relative;
    margin-top: 30px;
    margin-right: 30px;
    border-radius: 16px;
    padding: 20px;
    color: white;
    background-color: #EF7C00;
}

#recommend {
    border-style: solid;
    border-width: 1px;
    padding: 10px
}

</style>