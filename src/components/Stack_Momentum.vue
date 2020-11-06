<template>
<div id=stack>
    <h3 id=intro> Here is your schedule at a glance.</h3>
    <div id=sect>
        <div id=notToday>
            Yesterday:
            <div id=subSect>
                <ul>
                <li v-for="event in ytdEvents" v-bind:key="event">
                    <div> {{event}} </div>
                </li>
                </ul>
            </div>
            <br>
        </div>
        <div id=today>
            <b>Today:</b> 
            <div id=subSect>
                <ul>
                <li v-for="event in tdyEvents" v-bind:key="event">
                    <div> {{event}} </div>
                </li>
                </ul>
            </div>
            <br>
        </div>
        <div id=notToday>
            Tomorrow:
            <div id=subSect>
                <ul>
                <li v-for="event in tmrEvents" v-bind:key="event">
                    <div> {{event}} </div>
                </li>
                </ul>
            </div>
        </div>
    </div>
    <br>
</div>
</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    components: {
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email,
            mth31: [1,3,5,7,8,10,12],
            mth30: [4,6,9,11],
            ytd: 0,
            tdy: 0,
            tmr: 0,
            ytdEvents: [],
            tdyEvents: [],
            tmrEvents: [],
        }
    },

    methods: {
        fetchItems: function() {
            database.collection("users").doc(this.usr).collection("time").get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().date == this.ytd) {
                        this.ytdEvents.push(doc.data().title)
                    } else if (doc.data().date == this.tdy) {
                        this.tdyEvents.push(doc.data().title)
                    } else if (doc.data().date == this.tmr) {
                        this.tmrEvents.push(doc.data().title)
                    }
                })
                //console.log(this.ytdEvents)
                //console.log(this.tdyEvents)
                //console.log(this.tmrEvents)
            })
        },
    }, 
    created() {
        //getting dates for database retrieval
        let today = new Date()
        this.tdy = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate()
        //tomorrow
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        this.tmr = (tomorrow.getFullYear()*10000) + ((tomorrow.getMonth()+1)*100) + tomorrow.getDate()
        //console.log(this.tmr)
        //yesterday
        let yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        this.ytd = (yesterday.getFullYear()*10000) + ((yesterday.getMonth()+1)*100) + yesterday.getDate()
        //console.log(this.ytd)
        this.fetchItems()
    },
}
</script>

<style scoped>
    #sect {
        border-style: solid;
        border-width: 1px;
        padding: 10px;
        border-radius: 16px;
    }

    #notToday {
        color: gray;
        text-align: left;

    }

    #today {
        color: black;
        text-align: left;
    }

    #subSect {
        border-style: solid;
        border-width: 1px;
        padding: 10px;
        border-radius: 16px;
        border-color: darkgrey
    }

    #subSect:after {
        content: "";
        display: table;
        clear: both;
    }

    #intro {
        text-align: left;

    }






    /*


    #column:after {
        content: "";
        display: table;
        clear: both;
    }

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

    .divider{
        width:20px;
        height:auto;
        display:inline-block;
    }

    #insights {
        float:left;
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
        padding: 10px;
    }

    #right_seg:after {
        content: "";
        display: table;
        clear: both;
    }
    */

</style>
