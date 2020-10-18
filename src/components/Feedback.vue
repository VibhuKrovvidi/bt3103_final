<!-- This names a doc f1. It should be replaced with the user's id down the road -->

<template>
    <div class="page"> 
        <h1 class = "pagehead">  Feedback  </h1>
        <div class = "content"> 
            <body>
                <b>Give the University Administration your feedback. Fill up the form below and click submit to provide the feedback. </b>
            </body>
            <form class = "feedback_form">
                <label for="category"> Select Category: </label> <br>
                <select id="category" name="category" style="font-size:1em; color:#003D7C" @change="onChange($event)" v-model="cat">
                    <option value="faculty"> Faculty </option>
                    <option value="resid"> Residential </option>
                    <option value="activity"> Activities Related </option>
                    <option value="mysid"> MySID </option>
                    
                </select> <br> <br>
                <div class="details" v-if="this.cat == 'resid'">
                    <label for="select_resid"> Please Select Your Residency </label> <br>
                    <select id="select_resid" name="select_resid" style="font-size:1em; color:#003D7C" 
                    @change="selectResidency($event)" v-model="residency">
                        <option value="cinnamon"> Cinnamon College </option>
                        <option value="tembusu"> Tembusu College </option>
                        <option value="rc4"> RC4 </option>
                        <option value="capt"> College of Alice & Peter Tan </option>
                        <option value="utr"> UTown Residences </option>

                    </select> <br><br>
                </div> 

                <label for="fback"> Enter Feedback: </label> <br>
                <textarea id="fback" name="fback" rows="10" cols="50" style="font-size:1em; color:#003D7C" 
                @change="enterFeedback($event)" v-model="txtfback">
                    Enter Feedback Here
                </textarea> <br><br>

                <input type="submit" @click="submitForm($event)">

                



            </form>
        </div>
    </div>
    
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            cat : "",
            residency : "",
            txtfback : ""
             
        }
    },
    methods:{
        onChange(event) {
            console.log(event.target.value)
            this.cat = event.target.value
            
        },
        selectResidency(event) {
            console.log(event.target.value)
            this.residency = event.target.value
            
        },
        enterFeedback(event) {
            console.log(event.target.value)
            this.txtfback = event.target.value
            
        },
        submitForm(event) {
            event.preventDefault()
            console.log("Submitted Form : " + this.cat + " " + this.residency + " " + this.txtfback)
            database.collection('feedback_forms').add({
                category: this.cat,
                residency: this.residency,
                feedback: this.txtfback
            });
            
            
        }
    }
}
</script>

<style scoped>
.page {

    font-size: 1em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color:#003D7C;
    text-decoration: none;
    
}

body {
    font-size: 1.5em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color:#003D7C;
    text-decoration: none;
    text-align: center;
    padding-left: 8%;
    padding-right: 8%;

}

.pagehead {
    text-decoration: underline;
}

.feedback_form {
    font-size: 1.5em;
}

</style>