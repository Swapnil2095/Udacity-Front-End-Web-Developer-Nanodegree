/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("test to check feed URL should be defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          //console.log("feed.url =", feed.url);
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("test to check feed Name should be defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          //console.log("feed.name =", feed.name);
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    /* A new test suite named "The menu" */
    describe("The menu", function() {
      const body = document.querySelector("body");

      /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      it("test to check menu element should be hidden", function() {
        //const body = document.querySelector("body");
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it("test to check menu should changes visibility when the menu icon is clicked", function() {
        //const body = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });

    /* A new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, done); //loadFeed function is called
      });

      /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      it("test to check loadFeed function should completes its work", function(done) {
        var numberOfEntries = document
          .querySelector(".feed")
          .getElementsByClassName("entry").length;
        //console.log("numberOfEntries =", numberOfEntries);
        expect(numberOfEntries).toBeGreaterThan(0);
        done();
      });
    });

    /* A new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      let initialFeed, finalFeed;

      beforeEach(function(done) {
        loadFeed(0, function() {
          initialFeed = document.querySelector(".feed").innerHTML;
          //console.log(initialFeed);
          loadFeed(1, function() {
            finalFeed = document.querySelector(".feed").innerHTML;
            //console.log(finalFeed);
            done();
          });
        });
      });

      /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      it("test to check content actually changes", function(done) {
        expect(finalFeed).not.toBe(initialFeed);
        done();
      });
    });
  })()
);
