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

    ul {
        list-style-type: none;
    }
</style>
