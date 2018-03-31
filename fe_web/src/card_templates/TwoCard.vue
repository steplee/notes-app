<template>
  <div class="two_card_content">
    <br>
    Deck: {{$route.params.deck_id}}
    <br>

    <div id="cardContent">
      <template v-if="side == 0 || side == 2">
        <h1>{{ cardData.fields.front }}</h1>
      </template>
      <template v-if="side == 1 || side == 2">
        <h2>{{ cardData.fields.back }}</h2>
      </template>
    </div>

    <template v-if="!finished">
      <button ref="flip" id="showNextSideBtn" v-on:click="showNextSide" autofocus v-focus> flip! </button>
    </template>
  </div>
</template>

<script>

var defaultData = function() {
  return {
    side: 0,
    numSides: 2,
    finished: false
  }
}

export default {
  name: 'TwoCard',
  props: [ 'cardData' ],
  data: defaultData,
  methods: {
    showNextSide: function() {
      if (!this.finished) {
        this.side += 1;
        if (this.side == this.numSides) {
          this.finished = true;
          this.$emit('cardFinished');
          console.log("Emit finish from AC")
        }
      }
    },

    
    resetCard: function() {
      Object.assign(this.$data, this.$options.data())
    }
  },

  watch: {
    // When a new card is swapped in, we reset our state.
    cardData: function() {
      console.log("TC card data changed");
      console.log(this.cardData.fields);
      Object.assign(this.$data, this.$options.data());

      if (this.$refs.flip)
        this.$refs.flip.focus();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

#cardContent {
}
#showNextSideBtn {
  height: 20px;
  width: 100%
}
</style>
