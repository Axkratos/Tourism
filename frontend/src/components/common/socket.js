// socket.js
import { io } from "socket.io-client";

class SocketSingleton {
  constructor() {
    if (!SocketSingleton.instance) {
      this.socket = io('http://localhost:3000'); // Corrected the URL
      SocketSingleton.instance = this;
    }
    return SocketSingleton.instance;
  }

  getSocket() {
    return this.socket;
  }
}

const instance = new SocketSingleton();
Object.freeze(instance);

export default instance;
