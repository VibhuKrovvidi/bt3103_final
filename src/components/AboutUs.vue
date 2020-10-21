<template>
<div class="app">
    <h1> About Us </h1>
    <div id="container">
        <div id="first">
            <h3 id='component_header'> Take Control Of Your Time </h3>
                <p id='time_content'>fkejajkanjkanna</p>

        </div>
        <div id="second">
            <h3 id='component_header'> Information at your fingertips </h3>
            <p id='nus_content'>ffkejajkanjkanna</p>

        </div>
        
        <div id="clear"></div>
</div>
    </div>
</template>

<script>
export default {
    
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
    #second {
        width: 500px;
        float: left;
        height: 300px;
        background-color: #F5AD69;
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