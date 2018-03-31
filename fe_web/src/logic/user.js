import Deck from './deck'

function createNewUserState(deck_id, deck_name, deck_id_order) {
  return {
    deck_id: deck_id,
    deck_name: deck_name,
    unseen_card_ids: deck_id_order,
    queue: []
  }
}

export default class User {
  constructor(name, id) {
    this.user_id = id;
    this.user_name = name;

    this.decks = {};
    this.state_jobj = require(`../user_data/${this.user_id}`);
    window.d = this.state_jobj;
  }

  loadDeck(user_id, deck_id) {
    if (deck_id in this.decks)
      return this.decks[deck_id];

    // load deck from disk.
    console.log('deck id', id)
    var deck_jobj = require(`../card_data/${user_id}/${deck_id}`)


    // load user state or make new one
    var user_state = undefined;
    for (var obj of this.state_jobj.states) {
      if (obj.deck_id == deck_id) {
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
    this.decks[deck_id] = deck;
    return deck;
  }
}


