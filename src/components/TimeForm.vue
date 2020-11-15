<template>
    <div>
        <navi></navi>
        <br><br>
        <h1> Time </h1>
        <h3> Good afternoon. Here is a breakdown and analysis of your time spent yesterday.</h3>

        <br><br>

        <form>
            <label>Event Name</label>
            <input type="text" v-model="entry.title" placeholder="Insert Event Name" required />
            <br><br>
            <label>Category</label>
            <select v-model="entry.category" required >
                <option value="work">Work</option>
                <option value="social">Social</option>
                <option value="exercise">Exercise</option>
                <option value="sleep">Sleep</option>
                <option value="idle">Idle</option>
                <option value="others">Others</option>
            </select>
            <br><br>
            <label>Date</label><br>
            <input type=date v-model="entry.date" required />
            <br><br>
            <label>Start Time (HHMM) </label>
            <input type="number" v-model.number="entry.start" placeholder="HHMM" min="0" max="2359" required />
            <br><br>
            <label>End Time (HHMM) </label>
            <input type="number" v-model.number="entry.end" placeholder="HHMM" min="0" max="2359" required />
            <br><br>
            <button v-on:click.prevent="sub" id=submit > Submit </button>
        </form>
        <br><br>
    </div>

</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    data(){
        return {
            usr: firebase.auth().currentUser.email,
            mth31: [1,3,5,7,8,10,12],
            mth30: [4,6,9,11],
            tdy: '',
            entry: {
                title: "",
                category: "work", //default value for dropdown
                date: new Date(), //default populated with today in created hook 
                start:'',
                end:'',
            },
        }
    },

    methods: {
        sub: function() {
            //Data validation
            var sel = new Date(this.entry.date)
            var dte = (sel.getFullYear()*10000) + ((sel.getMonth()+1)*100) + (sel.getDate())
            console.log(dte)
            if (this.entry.start >= this.entry.end) {
                alert("Invalid start/end, end must be after start!")
            } else if (this.entry.start%100 >= 60) {
                alert("Start time: Minutes cannot be more than 59")
            } else if (this.entry.end%100 >= 60) {
                alert("End time: Minutes cannot be more than 59")
            } else if (this.entry.start >= 2400 || this.entry.end >= 2400) {
                alert("Start and end time cannot be more than 2400hrs!")
            } else {
                database.collection("users").doc(this.usr).collection("time").add({
                    title: this.entry.title,
                    category: this.entry.category, 
                    date: dte,  
                    start: this.entry.start,
                    end:this.entry.end,
                })
                this.entry.title=""
                this.entry.category=""
                this.entry.date= this.tdy
                this.entry.start=''
                this.entry.end=''
                this.$router.push({ path: '/time'});
            }
        }
    },

    created: function() {
        //inserting default date as today
        var tdy = new Date()
        var yr = tdy.getFullYear()
        var mth = (tdy.getMonth()+1)
        var day = (tdy.getDate())
        var final = yr.toString() + "-" + mth.toString() + "-" + day.toString()
        this.tdy = final
        this.entry.date = final
    },
}
</script>

<style scoped>

input[type=text], select, input[type=number]  {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

#submit {
  background-color: orange;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#submit:hover {
  background-color: orangered;
}

form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 30px;
  position: relative;
  margin: auto;
  text-align: left;
  font-size: 18px;
  width: 60%;
}

</style>
