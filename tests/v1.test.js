const Stateless = require('./../v1')();

describe("Stateless v1 Tests", ()=>{

    it("Adds an event name to the collection", ()=>{
        Stateless.addEvent("Test Event");
        expect(Stateless.containsEvent("Test Event")).toBe(true);
    });

});