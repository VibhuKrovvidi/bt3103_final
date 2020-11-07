<template>
    
        <button class="updatebox"> 
            <div class="uppic">
                Z
            </div>
            <div class="cont">  
                {{title}}<br>
                <p> 
                    {{contents}}
                </p>
            </div> 
        
        </button>
    
</template>

<script>
export default {
    data:function() {
        return {
            title : "",
            contents : ""
        }
        
    },

    methods : {
        populateFeed() {
            
        } 
    }
    
}
</script>

<style scoped>
    .updatebox {
        height: 100px;
        width: 700px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    .uppic {
        height: 80px;
        width: 80px;
        background-color: #EF7C00;
        color : #003D7C;
        float: left;
        font-size: 4.5em;
    }
</style>