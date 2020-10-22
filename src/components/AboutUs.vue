<template>
<div class="app">
    <h1> About Us </h1>
    <div id="container">
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
        
        <div id="clear"></div>
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
    }
    #first:hover {
        background-color:#003D7C;
        color:white;
    }
    
    #second {
        width: 500px;
        float: left;
        height: 300px;
        background-color: #F5AD69;
        
    }

    #second:hover{
        background-color: #EF7C00;
        color: white;
    }
    
    #component_header {
        color: whitesmoke;
        font-size: 30px;
    }
    #clear {
        clear: both;
    }

    #time_content {

    }

    #nus_content {
        
    }

</style>