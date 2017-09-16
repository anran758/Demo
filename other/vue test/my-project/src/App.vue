<template>
  <div id="app">
    <h1>{{title}}</h1>
    <input v-module="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
      {{ item.label }}
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'this is a todo lisat',
      items: [
        {
          label: 'coding',
          isFinished: false
        },
        {
          label: 'walking',
          isFinished: true
        }
      ],
      newItem: ''
    }
  },
  methods: {
    toggleFinish: function(item) {
      console.log(item)
    },
    addNew: function() {
      console.log(this.newItem)
    }
  }
}
</script>

<style>
.finished {
  text-decoration:  underline;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
