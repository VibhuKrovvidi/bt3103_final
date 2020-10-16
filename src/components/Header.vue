
<template>
  <div class="navbar">
      <div class = "logo">
          MySID
          </div>
    <nav class="pagecontents">
            <router-link class="custom-nav-item" to="/aboutus" exact>About Us</router-link>
            <router-link class="custom-nav-item" to="/admin" exact>Admin</router-link>
            <router-link class="custom-nav-item" to="/dashboard" exact>Dashboard</router-link>
            <router-link class="custom-nav-item" to="/faq" exact>FAQ</router-link>
            <router-link class="custom-nav-item" to="/feedback" exact>Feedback</router-link>
            <router-link class="custom-nav-item" to="/modules" exact>Modules</router-link>
            <router-link class="custom-nav-item" to="/time" exact>Time</router-link>
            <router-link class="custom-nav-item" to="/zoning" exact>Zoning</router-link>
            
        </nav> 
  </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>
    .logo {
        width : 10%;
        overflow: hidden;
        font-size: 3em;
        text-align:left;
        float : left;

    }
    
    
    .custom-nav-item {
        font-size: 1.5em;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: bold;
        color:#003D7C;
        letter-spacing: 1px;
        margin-left: 10px;
        text-decoration: none;
    }

    .custom-nav-item:hover {
        border-bottom : #EF7C00;
    }

    .router-link-exact-active {
      color : #EF7C00;
    }

    .pagecontents {
        margin-top: 100px;
    }
    

</style>