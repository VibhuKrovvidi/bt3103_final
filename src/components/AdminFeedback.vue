<template>
<div>
    <navi></navi>
    <h1> Admin </h1>
    <h3> Feedback </h3>

    <br>
    <h2 class=category> A. Faculty </h2>
    <ul>
        <li v-for="fb in faculty" v-bind:key="fb.feedback">
            <h4> {{fb.feedback}} </h4>
        </li>
    </ul>
    
    <h2 class=category> B. Residential </h2>
    <ul>
        <li v-for="fb in resid" v-bind:key="fb.feedback">  
            <h3> {{fb.residency}} </h3>
            <p> {{fb.feedback}} </p>
        </li>
    </ul>
        
    <h2 class=category> C. Activities Related </h2>
    <ul>
        <li v-for="fb in activity" v-bind:key="fb.feedback">
            <p> {{fb.feedback}} </p>
        </li>
    </ul>

    <h2 class=category> D. MySID </h2>
    <ul>
        <li v-for="fb in mysid" v-bind:key="fb.feedback">
            <p> {{fb.feedback}} </p>
        </li>
    </ul>

    <h2 class=category> E. Others </h2>
    <ul>
        <li v-for="fb in others" v-bind:key="fb.feedback">
            <p> {{fb.feedback}} </p>
        </li>
    </ul>
</div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            faculty: [],
            resid: [],
            activity: [],
            mysid: [],
            others: []
        }
    },

    methods: {
        getFaculty() {
            database.collection("feedback_forms").where("category", "==", "faculty").get().then((querySnapShot) => {
                    let fb = {}
                    querySnapShot.forEach(doc => {
                        fb = doc.data()
                        console.log(fb)
                        this.faculty.push(fb)
                    })
                }
            )
        },

        getResi() {
            database.collection("feedback_forms").where("category", "==", "resid").get().then((querySnapShot) => {
                    let fb = {}         
                    querySnapShot.forEach(doc => {  
                        fb = doc.data()
                        console.log(fb)
                        this.resid.push(fb)
                    })
                }
            )
        },

        getActivity() {
            database.collection("feedback_forms").where("category", "==", "activity").get().then((querySnapShot) => {     
                    let fb = {}         
                    querySnapShot.forEach(doc => {  
                        fb = doc.data()
                        console.log(fb)
                        this.activity.push(fb)
                    })
                }
            )
        },

        getMysid() {
            database.collection("feedback_forms").where("category", "==", "mysid").get().then((querySnapShot) => {           
                   let fb = {}         
                    querySnapShot.forEach(doc => {  
                        fb = doc.data()
                        console.log(fb)
                        this.mysid.push(fb)
                    })
                }
            )
        },

         getOthers() {
            database.collection("feedback_forms").where("category", "==", "others").get().then((querySnapShot) => {           
                    let fb = {}         
                    querySnapShot.forEach(doc => {  
                        fb = doc.data()
                        console.log(fb)
                        this.others.push(fb)
                    })
                }
            )
        }
    },

    created() {
            this.getFaculty(),
            this.getResi(),
            this.getActivity(),
            this.getMysid(),
            this.getOthers()
    }
    
}
</script>

<style scoped>
.category {
  padding: 30px;
  width: 80%;
  position: relative;
  border-radius: 20px;
  margin: auto;
  margin-bottom: 20px;
  background:#ebf1faff;
  text-align: left;
}

ul {
    list-style-type: none;
    text-align: left;
    padding-left: 0;
    width: 80%;
    margin: auto;
}

p {
    font-size: 18px;
    background-color: lightgrey;
    padding: 20px;
}

</style>