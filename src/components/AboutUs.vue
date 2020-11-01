<template>
<div class="app">
    <div class = "logo"> MySID </div>
    <h1> About Us </h1>
    <div id="container">
        <div id="login">
            <button class="redirector" @click="redirect($event)"> 
                <img class="nuslogo" src="http://www.nus.edu.sg/images/default-source/identity-images/nus-logo-blue_vertical.jpg">
                <br>Go to Login Page 
                
                </button>
        </div>
        <div id="first" @mouseover="hover1 = true" @mouseleave="hover1 = false">
            <h3 id='component_header' > Take Control Of Your Time </h3>
                <p id='time_content' v-if="hover1">
                    fkejajkanjkanna
                </p>

        </div>
        <div id="second" @mouseover="hover2 = true" @mouseleave="hover2 = false">
            <h3 id='component_header'> Information at your fingertips </h3>
            <p id='nus_content' v-if="hover2">
                ffkejajkanjkanna
            </p>

        </div>
        
        
        
</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            hover1 : false,
            hover2 : false
        }
        
    },
    methods : {
        redirect:function(event) {
            event.preventDefault()
            this.$router.push({ path: '/login'})
        }
    }
}
</script>

<style scoped>
    #header {
        width: 100%;
        background-color: red;
        height: 30px;
    }

    #container {
        width: 1000px;
        background-color:white;
        margin: auto;
    }
    #first {
        width: 500px;
        float: left;
        height: 300px;
        background-color:#526C80;
        border-color: white;
    }
    #first:hover {
        background-color:#003D7C;
        color:white;
        height: 600px;
    }
    
    #second {
        width: 500px;
        float: left;
        height: 300px;
        background-color: #F5AD69;
        border-color: white;
    }

    #second:hover{
        background-color: #EF7C00;
        color: white;
        height: 600px;
    }
    
    #component_header {
        color: whitesmoke;
        font-size: 30px;
    }
    #clear {
        clear: both;
    }

    .nuslogo {
        width: 400px;
        height: 400px;
    }

    .redirector {
        width: 1000px;
        height: 500px;
        background: white;
        color: #003D7C;
        font-size: 30px;
        border-color: white;

    }

    .redirector:hover {
        background: whitesmoke;
    }

</style>