import { expect } from "chai";
import jsdom from "jsdom/lib/old-api.js";
// import jsdom from "jsdom";
// const { JSDOM } = jsdom;
import fs from "fs";

describe("our first test", () => {
  it("should passs", () => {
    expect(true).to.equal(true);
  })
})

describe("index.html", () => {
  it("should say hello", (done) => {
    const index = fs.readFileSync("./src/index.html", "utf-8");
    jsdom.env(index, (err, window) => { // second parameter is array of js files
      const h1 = window.document.getElementsByTagName("h1")[0];
      console.log(h1.innerHTML);
      expect(h1.innerHTML).to.equal("Hello World!");
      done();
      window.close(); // to free up taken memory
    });

    // let promise = JSDOM.fromFile("./src/index.html").then((dom, done) => { // second parameter is array of js files
    //   const window = dom.window;
    //   const h1 = window.document.getElementsByTagName("h1")[0];
    //   expect(h1.innerHTML).to.equal("Hello World!");
    //   window.close(); // to free up taken memory
    // });
  })
})
