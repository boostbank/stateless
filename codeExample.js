var Stateless = require("./src/statless");

//
/**
 * You dispatch events much like actions in redux but they do not directly modify state.
 * The main difference between an action in redux and event in statless is that you return an object.
 * The required property on an event is the id the rest is up to you.
 */
const NAME = "componentEvent";
const componentEvent = () => {
  return {
    id: NAME,
    payload: {
      worksWith: ["Node.js", "React", "Other Javascript Frameworks"]
    }
  };
};


function main(){


}

