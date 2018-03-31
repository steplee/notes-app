
function createNewUserState(deck_id, deck_name, deck_id_order) {
  return {
    deck_id: deck_id,
    deck_name: deck_name,
    unseen_card_ids: deck_id_order,
    queue: []
  }
}

export class User {
  constructor() {
    this.user_id = "steplee";
    this.user_name = "steplee";

    this.decks = {};
    this.state_jobj = require(`../user_data/${this.user_id}`);
    window.d = this.state_jobj;
  }

  loadDeck(id) {
    if (id in this.decks)
      return this.decks[id];

    // load deck from disk.
    console.log('deck id', id)
    var deck_jobj = require(`../card_data/${id}`)


    // load user state or make new one
    var user_state = undefined;
    for (var obj of this.state_jobj.states) {
      if (obj.deck_id == id) {
        user_state = obj;
        break;
      }
    }

    if (user_state == undefined) {
      user_state = createNewUserState(id, deck_jobj.name, deck_jobj.order);
      this.state_jobj.states.push(user_state);
    }



    // instantiate deck object & cache
    var deck = new Deck(this, deck_jobj, user_state);
    this.decks[id] = deck;
    return deck;
  }
}

// DeckPlayer calls pullNextCard
//    Here is a period where the card is _completely_ absent from state.queue
// DeckPlayer calls scheduleNextCard
//    Here the card is rescheduled in state.queue
//    Implementing a return-to-last-card feature could search the queue by time (store time after schedule along with recentHistory)

export class Deck {
  constructor(user, deck_jobj, state_jobj) {
    this.user = user;
    Object.assign(this, deck_jobj)
    this.state = {}
    Object.assign(this.state, state_jobj)

    this.recentHistory = []
  }

  // Return card as json obj. Does not check that card is 'due'
  pullNextCard() {
    if (this.state.queue.length == 0) {
      // TODO: should I just pull from unseen cards?
      //throw Error("Deck::pullNextCard: empty!");
      return undefined;
    }
    if (this.state.queue[0].time > Date.now()) {
      //throw Error(`Deck::pullNextCard: too soon, must wait __${(this.state.queue[0].time-Date.now())*.001}__ seconds`);
      console.log(`Deck::pullNextCard: too soon, must wait __${(this.state.queue[0].time-Date.now())*.001}__ seconds`);
      return undefined;
    }

    var card_id = this.state.queue.shift().card_id
    this.recentHistory.push(card_id);

    var card = this.cards[card_id];

    return card;
  }


  numberCardsPastDue() {
    var now = Date.now();
    var q = this.state.queue;
    var i = 0;

    // TODO binary search or bst search
    while (i < q.length && q[i].time <= now)
      i++;

    return i;
  }

  // TODO: Balanced binary search tree 
  // Assumes card is __already__ absent from queue, and we will simply place it at :time
  scheduleCard(card_id, time) {
    var q = this.state.queue;

    var obj = {time, "card_id":card_id};

    for (var i=0; i<q.length; i++) {
      if (time < q[i].time) {
        // insert here
        var c = q.splice(i);
        this.state.queue = q.concat([obj], c);

        return;
      }
    }

    q.push(obj); // insert at end
    console.log(`Queue looks like`, q);
  }

  save() {
    console.log("Deck::saving");
  }

  exportState() {
    return JSON.stringify(this.state);
  }

}
