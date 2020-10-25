<template>
    <div>
        <h1> Time </h1>
        <h3> Good afternoon. Here is a breakdown and analysis of your time spent yesterday.</h3>

        <br><br>

        <form>
            <label>Event Name</label>
            <input type="text" v-model="entry.title" required />
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
            <label>Date</label>
            <input type="number" v-model.number="entry.date" placeholder="YYYYMMDD" min="0" required />
            <br><br>
            <label>Start Time</label>
            <input type="number" v-model.number="entry.start" placeholder="HHMM"  min="0" max="2359" required />
            <br><br>
            <label>End Time</label>
            <input type="number" v-model.number="entry.end" placeholder="HHMM" min="0" max="2359" required />
            <br><br>
            <button v-on:click.prevent="sub" id=submit > Submit </button>
        </form>
    </div>

</template>

<script>
import database from '../firebase.js'

export default {
    data(){
        return {
            nusnet: "e1234567a", //hardcoded but can be passed as prop from login
            entry: {
                nusnet: "",
                title: "",
                category: "",
                date:'',  
                start:'',
                end:'',
            },
        }
    },

    methods: {
        sub: function() {
            this.entry.nusnet = this.nusnet
            database.collection("time").add(this.entry)
            this.entry.title=""
            this.entry.category=""
            this.entry.date=''
            this.entry.start=''
            this.entry.end=''
            this.$router.push({ path: '/time'});
        }
    }
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
  margin: 8px 0;
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
  padding: 20px;
  position: relative;
  margin: auto;
  text-align: left;
  font-size: 18px;
  width: 60%;
}

</style>