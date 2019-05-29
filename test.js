const {addEvent, listen, ignore, dispatch} = require("./src/stateless");

const componentEvent = () => {
    return {
      id: "test",
      payload: {
        worksWith: ["Node.js", "React", "Chrome", "Firefox", "Edge", "IE 11", "And many more!"]
      }
    };
  };

addEvent("test");

let obj = {};

listen("test",obj, event=>{
    console.log(event);
} );

dispatch(componentEvent());

ignore("test", obj);
