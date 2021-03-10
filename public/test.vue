<template>
  <div>
    <p v-for="(item,i) of aa">{{ item }}{{i}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      aa:{
        a:1,
        b:2
      }
    }
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>
