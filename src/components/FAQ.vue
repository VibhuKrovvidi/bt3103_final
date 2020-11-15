<template>
<div id ="FAQ">
    <navi></navi>
    <br><br>
    <h1> FAQ </h1>
    <br>

    <h2 class=category> A. Zoning Policies </h2>
    <ul>
        <li v-for="policy in zoning" v-bind:key="policy.question">
            <h3> Question: {{policy.question}} </h3>
            <p> {{policy.answer}} </p>
            <br>
        </li>
    </ul>
    
    <h2 class=category> B. Health Policies </h2>
    <ul>
        <li v-for="policy in health" v-bind:key="policy.question">
            <h3> Question: {{policy.question}} </h3>
            <p> {{policy.answer}} </p>
            <br>
        </li>
    </ul>
        
    <h2 class=category> C. Residential Policies </h2>
    <ul>
        <li v-for="policy in residential" v-bind:key="policy.question">
            <h3> Question: {{policy.question}} </h3>
            <p> {{policy.answer}} </p>
            <br>
        </li>
    </ul>

    <h2 class=category> D. Student Services </h2>
    <ul>
        <li v-for="policy in studentServices" v-bind:key="policy.question">
            <h3> Question: {{policy.question}} </h3>
            <p> {{policy.answer}} </p>
            <br>
        </li>
    </ul>

    <h2 class=category> E. Others </h2>
    <ul>
        <li v-for="policy in others" v-bind:key="policy.question">
            <h3> Question: {{policy.question}} </h3>
            <p> {{policy.answer}} </p>
            <br>
        </li>
    </ul>
</div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            zoning: [],
            health: [],
            residential: [],
            studentServices: [],
            others: []
        }
    },

    methods: {
        getZoning() {
            database.collection("FAQ").where("category", "==", "zoning").get().then((querySnapShot) => {
                    let policy = {}
                    querySnapShot.forEach(doc => {
                        policy = doc.data()
                        console.log(policy)
                        this.zoning.push(policy)
                    })
                }
            )
        },

        getHealth() {
            database.collection("FAQ").where("category", "==", "health").get().then((querySnapShot) => {
                    let policy = {}
                    querySnapShot.forEach(doc => {
                        policy = doc.data()
                        policy.id = policy.question
                        console.log(policy)
                        this.health.push(policy)
                    })
                }
            )
        },

        getResidential() {
            database.collection("FAQ").where("category", "==", "residential").get().then((querySnapShot) => {     
                    let policy = {}         
                    querySnapShot.forEach(doc => {  
                        policy = doc.data()
                        policy.id = policy.question
                        console.log(policy)
                        this.residential.push(policy)
                    })
                }
            )
        },

        getServices() {
            database.collection("FAQ").where("category", "==", "studentServices").get().then((querySnapShot) => {           
                    let policy = {}         
                    querySnapShot.forEach(doc => {  
                        policy = doc.data()
                        policy.id = policy.question
                        console.log(policy)
                        this.studentServices.push(policy)
                    })
                }
            )
        },

         getOthers() {
            database.collection("FAQ").where("category", "==", "others").get().then((querySnapShot) => {           
                    let policy = {}         
                    querySnapShot.forEach(doc => {  
                        policy = doc.data()
                        policy.id = policy.question
                        console.log(policy)
                        this.others.push(policy)
                    })
                }
            )
        }
    },

    created() {
            this.getZoning(),
            this.getHealth(),
            this.getResidential(),
            this.getServices(),
            this.getOthers()
    }
    
}
</script>

<style scoped>
.category {
  padding: 1.5%;
  width: 90%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 3.5% 2% 3.5%;
  background:#ebf1faff;
  transition: all 0.3s ease-in-out;
  text-align: left;
}

ul {
    list-style-type: none;
    text-align: left;
    margin: 0 5% 0 5%;
}

p {
    font-size: 18px;

}

</style>
