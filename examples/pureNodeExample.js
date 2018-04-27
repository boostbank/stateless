// Replace with -> var Statless = require("@boostbank/stateless/lib/stateless") when you use it.
const Stateless = require("./../src/stateless");

//
/**
 * You dispatch events much like actions in redux but they do not directly modify state.
 * The main difference between an action in redux and event in statless is that you return an object.
 * The required property on an event is the id the rest is up to you.
 */
// Can be put in a different file and imported.
const NAME = "componentEvent";
const componentEvent = () => {
  return {
    id: NAME,
    payload: {
      worksWith: ["Node.js", "React", "Chrome", "Firefox", "Edge", "IE 11", "And many more!"]
    }
  };
};

function main() {
  // You have to add an event to stateless for it to listen for it.
  Stateless.addEvent(NAME);

  // Listen to an event passing the name of the event you want to listen to.
  // Then an unique identifier for the listener.
  // Then a function with 1 parameter for the event.
  // Its recommended to use a UUID for the uid.
  Stateless.listen(NAME, "12345", eventCallback);

  // Another Example.
  Stateless.listen(NAME, "123456", event => {
    console.log("Inline Event");
    console.log(event.payload);
  });

  // Dispatching Events
  Stateless.dispatch(componentEvent());
}

const eventCallback = event => {
  console.log("Component Event");
  console.log(event.payload);
};

main();
