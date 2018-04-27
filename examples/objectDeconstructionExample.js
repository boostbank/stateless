// Replace with -> const {addEvent, listen, dispatch} = require("@boostbank/stateless/lib/stateless") when you use it.
const {addEvent, listen, dispatch} = require("./../src/stateless");

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
  addEvent(NAME);

  // Listen to an event passing the name of the event you want to listen to.
  // Then an unique identifier for the listener.
  // Then a function with 1 parameter for the event.
  // Its recommended to use a UUID for the uid.
  listen(NAME, "12345", eventCallback);

  // Another Example.
  listen(NAME, "123456", event => {
    console.log("Inline Event");
    console.log(event.payload);
  });

  // Dispatching Events
  dispatch(componentEvent());
}

const eventCallback = event => {
  console.log("Component Event");
  console.log(event.payload);
};

main();
