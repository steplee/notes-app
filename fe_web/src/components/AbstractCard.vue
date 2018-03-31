<!-- 
  Right now, I am passing events up from child to parent, I might use vuex in future.

  User will interact with a concrete card.
  Concrete card will emit a 'cardFinished' event when user is done with it.
  AbstractCard will show time controls and emit 'advanceCard', and DeckPlayer will respond and load the next card.

  Note we:
     forward the prop 'card' straight to the concrete card
     
  TODO:
     Implement switch on card type

-->

<template>
  <div class="abstract_card_content" v-if="doShow">
    <template v-if="cardIsDone">
      <TimeControls v-on:advanceCard="advanceCard" ></TimeControls>
    </template>

    <!-- using `component`+is instead of the name itself allows dynamic -->
    <component v-bind:is="currentConcreteCard" v-bind:cardData=card
               v-if="this.card!=undefined"
               v-on:cardFinished="cardFinished"></component>
  </div>
</template>

<script>
import Vue from 'vue'

import TimeControls from '@/components/TimeControls'

export default {
  name: 'AbstractCard',
  props: [ 'card' ],
  components: {
  },
  data: function() {
    return {
      currentConcreteCard: 'TwoCard',
      cardIsDone: false,
      doShow: true
    };
  },
  created: function() {
    if (this.card != undefined)
      this.currentConcreteCard = this.card.type;
  },
  watch: {
    card: function() {
      console.log("AC card changed");
      this.cardIsDone = false;
      if (this.card == undefined) {
        this.doShow = false;
      } else {
        this.currentConcreteCard = this.card.type;
      }
    }
  },
  components: { 
    TwoCard: () => import(`../card_templates/TwoCard`),
    TimeControls
  },
  methods: {
    cardFinished: function() {
      this.cardIsDone = true;
    },
    advanceCard: function(time) {
      this.$emit('advanceCard', time);
    }
  }
}
</script>

<style scoped>
.abstract_card_content {
  width: 400px;
  height: 500px;
}
</style>
