<!--

  deck_loaded: flag to indicate we have loaded the deck json from file

  Manages deck object and changing cards.

-->

<template>
  <div class="deck_player_content">

    <template v-if="deck_loaded && activeCard">
      <AbstractCard v-on:advanceCard="advanceCard" v-bind:card=activeCard></AbstractCard>
    </template>

    <p v-if="activeCard == undefined">No cards left</p>
  </div>
</template>

<script>
import AbstractCard from '@/components/AbstractCard'
import {User} from '@/logic/schedule'

export default {
  name: 'TwoCard',
  data: function() {
    return {
      user: new User(),
      deck: {},
      deck_loaded: false,
      deck: {},

      activeCard: undefined,
      allCardsAreFinished: false,
    }
  },
  components: {
    AbstractCard
  },

  methods: {
    advanceCard: function(time) {
      console.log(`DeckPlayer advance card, delaying time by ${time-Date.now()}`)

      this.deck.scheduleCard(this.activeCard.id, time);

      var nxt = this.deck.pullNextCard();
      console.log("Pulled ",nxt);

      if (nxt == undefined) {
        this.allCardsAreFinished = true;
        this.activeCard = undefined;
      } {
        this.activeCard = nxt
      }
    },
  },
  created: function() {
    var name = this.$route.params.deck_id;

    //var deck = require(`../card_data/${name}`);
    var deck = this.user.loadDeck(name);
    if (deck) {
      this.deck_loaded = true;
      this.deck = deck;
      console.log(deck)
    }
    this.deck = deck;

    console.log("plyer created, DRAWING")
    this.activeCard = deck.pullNextCard();
  },

  componentWillUnmount: function() {
    save();
  },

  // Save deck state.
  save: function() {
    this.deck.save();
  }
  
}
</script>

<style scoped>
</style>
