<!-- This names a doc f1. It should be replaced with the user's id down the road -->

<template>
    <div class="page"> 
        <navi></navi>
        <h1> Feedback </h1>
        <h3>Give the University Administration your feedback. Fill up the form below and click submit to provide the feedback.</h3> 
        
        <form class=form>
            <label for="category"> Select Category: </label> <br>
            <select id="category" name="category" style="font-size:1em; color:#003D7C" @change="onChange($event)" v-model="cat">
                <option value="faculty"> Faculty </option>
                <option value="resid"> Residential </option>
                <option value="activity"> Activities Related </option>
                <option value="mysid"> MySID </option>
                <option value="others">Others</option>
                    
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

            <input id=submit type="submit" @click="submitForm($event)">

            <p>*This form is completely anonymous.</p>
        </form>
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
            
            alert("Thanks for submitting your feedback!")
            this.$router.push('/dashboard')

            
        }
    }
}
</script>

<style scoped>
textarea, select  {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 30px;
    position: relative;
    margin: auto;
    text-align: left;
    font-size: 18px;
    width: 60%;
}

p {
    font-size: 14px;
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

</style>