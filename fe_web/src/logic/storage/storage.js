
// This is a facade to both local and server storage. They will both be kept up to the 
// same state, to simplify logic.


import LocalStorageEngine from 'local_storage';
import RemoteStorageEngine from 'remote_storage';

class Storage {

  constructor(user) {
    this.user = user;

    this.local = new LocalStorageEngine(user)
    this.remote = new RemoteStorageEngine(user)
  }

  save_all() {
    this.local.save(this.user);
  }
}
