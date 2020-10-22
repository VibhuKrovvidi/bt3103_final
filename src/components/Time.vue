<template>
    <div>
        <h1> Time </h1>
        <h3> Good afternoon. Here is a breakdown and analysis of your time spent yesterday.</h3>

        <button v-show="!form" v-on:click="showform"> Add Item </button>

        <form v-show="form">
            <label>Event Name</label>
            <input type="text" v-model="entry.title"/>
            <label>Category</label>
            <select v-model="entry.category">
                <option value="work">Work</option>
                <option value="social">Social</option>
                <option value="exercise">Exercise</option>
                <option value="sleep">Sleep</option>
                <option value="idle">Idle</option>
                <option value="others">Others</option>
            </select>
            <label>Date</label>
            <input type="number" v-model.number="entry.date" placeholder="YYYYMMDD"/>
            <label>Start Time</label>
            <input type="number" v-model.number="entry.start" placeholder="HHMM"/>
            <label>End Time</label>
            <input type="number" v-model.number="entry.end" placeholder="HHMM"/>
            <button v-on:click.prevent="sub" > Submit </button>
        </form>

        <div id=chart>
            <piechart v-bind:chartdata = "datacollection" ></piechart>
        </div>

        <div id=data>
            <ul>
                <li v-for="cat in categories" v-bind:key="cat">
                    <h3> {{cat}} <span id=circle> {{Math.round(agg[categories.indexOf(cat)])}} hours</span> </h3>
                </li>
            </ul>

            <br>

            <button v-on:click="dateslice"> By Date </button>
            <br> <br>
            <button v-on:click="weekslice"> By Week </button>
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
import piechart from '../TimePieChart_NEW.js'
import database from '../firebase.js'

export default {
    components: {
        piechart
    },

    data(){
        return {
            nusnet: "e1234567a", //hardcoded but can be passed as prop from login
            entry: {
                nusnet: "",
                title: "",
                category: "",
                date:'', //using YYYYMMDD because idk how to use timestamp in firebase 
                start:'',
                end:'',
            },
            form: false,
            categories: [],
            agg: [],
            datacollection: {
                labels: [],
                datasets: [{
                    backgroundColor: ['steelblue', 'cadetblue', 'darkturquoise','aquamarine', 'paleturquoise','lightgrey'],
                    data: [],
                    borderWidth: 0.5
                }]
            },
        }
    },

    methods: {
        showform: function() {
            this.form = !this.form
        },
        sub: function() {
            this.entry.nusnet = this.nusnet
            database.collection("time").add(this.entry)
            this.entry.title=""
            this.entry.category=""
            this.entry.date=''
            this.entry.start=''
            this.entry.end=''
            this.form = !this.form
        },
        fetchItems: function() {
            database.collection('time').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().nusnet == this.nusnet) {
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
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
        dateslice: function() {
            //reset
            this.categories = []
            this.agg = []
            //getting today's date value
            let today = new Date()
            let tdy = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            database.collection('time').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().nusnet == this.nusnet && doc.data().date == tdy) {
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
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
        weekslice: function() {
            //reset
            this.categories = []
            this.agg = []
            //getting today's date value
            let today = new Date()
            let tdymax = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
            let tdymin = tdymax - 7
            database.collection('time').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().nusnet == this.nusnet && (doc.data().date <= tdymax && doc.data().date >= tdymin)) {
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
            this.datacollection.datasets[0].data = this.agg
            this.datacollection.labels = this.categories
        },
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
    display:inline;
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

