<template>
  <div class="time_controls">
    <form v-on:keydown.39="$event.target.nextElementSibling.focus()"
          v-on:keydown.37="$event.target.previousElementSibling.focus()">
    <button ref='0' id="bad"  v-on:click="advanceCard(60)" tabindex="0"> forgot (1m)</button>
    <button ref='1' id="okay" v-on:click="advanceCard(60*60)" autofocus v-focus tabindex="1"> so-so (1h)</button>
    <button ref='2' id="good" v-on:click="advanceCard(60*60*24)" tabindex="2"> known (1d)</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'TimeControls',
  data () {
    return {
    }
  },
  methods: {
    advanceCard: function(dt) {
      dt *= 1000;
      console.log("Timecontrols: Advacne card")
      this.$emit('advanceCard', Date.now() + dt)
    }
  }
}
</script>

<style scoped>
#bad {
  background: red;
}
#okay {
  background: blue;
}
#good {
  background: green;
}
</style>
