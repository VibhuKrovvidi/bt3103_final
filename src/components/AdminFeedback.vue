<template>
<div>
    <navi></navi>
    <h1> Admin </h1>
    <h3> Feedback </h3>

    <br>
    <h2 class=category> A. Faculty </h2>
    <ul>
        <li v-for="fb in faculty" v-bind:key="fb.feedback">
            <div class=feedback> <p>{{fb.feedback}}</p></div>
            <div class=reviewed> <p>{{fb.review}}</p> </div>

            <br><br><br><br>
            
        </li>
    </ul>
    
    <h2 class=category> B. Residential </h2>
    <ul>
        <li v-for="fb in resid" v-bind:key="fb.feedback">  
            <h3> {{fb.residency}} </h3>
            <div class=feedback> <p>{{fb.feedback}}</p></div>
            <div class=reviewed> <p>{{fb.review}}</p> </div>

            <br><br><br><br>
            
        </li>
    </ul>
        
    <h2 class=category> C. Activities Related </h2>
    <ul>
        <li v-for="fb in activity" v-bind:key="fb.feedback">
            <div class=feedback> <p>{{fb.feedback}}</p></div>
            <div class=reviewed> <p>{{fb.review}}</p> </div>

            <br><br><br><br>
        </li>
    </ul>

    <h2 class=category> D. MySID </h2>
    <ul>
        <li v-for="fb in mysid" v-bind:key="fb.feedback">
            <div class=feedback> <p>{{fb.feedback}}</p></div>
            <div class=reviewed> <p>{{fb.review}}</p> </div>

            <br><br><br><br>
        </li>
    </ul>

    <h2 class=category> E. Others </h2>
    <ul>
        <li v-for="fb in others" v-bind:key="fb.feedback">
            <div class=feedback> <p>{{fb.feedback}}</p></div>
            <div class=reviewed  @click="reviewed(fb.id)"> <p>{{fb.review}}</p> </div>

            <br><br><br><br>
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
        reviewed(id) {
            database.collection("feedback_forms").doc(id).delete()
        },
        
        getFaculty() {
            database.collection("feedback_forms").where("category", "==", "faculty").get().then((queryDocumentSnapShot) => {
                    let fb = {}
                    queryDocumentSnapShot.forEach(doc => {
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
            database.collection("feedback_forms").where("category", "==", "others").get().then((queryDocumentSnapShot) => {           
                    let fb = {}         
                    queryDocumentSnapShot.forEach(doc => {  
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
}


.feedback {
    float: left;
    position: relative;
    width: 80%;
    background-color: lightgrey;
    padding-left: 20px;
    padding-right: 20px;
     
}
.reviewed {
    float: left;
    background-color: #003D7C;
    position: relative;
    width: 15%;
    padding-left: 0px;
    text-align: center;
    color: white;

}


</style>