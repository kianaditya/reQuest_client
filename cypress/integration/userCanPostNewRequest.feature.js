describe("User can log in to post new reQuest", () => {
  beforeEach(() => {
    cy.server();
  });

  describe("can log in successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "**/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "POST",
        url: "**/quests/*",
        response: "fixture:post_new_quest.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "DELETE",
        url: "**/auth/*",
        response: "fixture:logout.json",
        headers: {
          uid: "user@mail.com",
        },
      });

      cy.visit("/");
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("Button#submit").contains("Submit").click();
      });
    });

    xit("and is directed to main page", () => {
      cy.get("#").should("contain", "");
    });

    it("with valid credentials", () => {
      cy.get("div#login").within(() => {
        cy.get("p").should("contain", "user@mail.com");
      });
    });

    it("can post new reQuest", () => {
      cy.get("#title").type("Fix my bike")
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!")
      cy.get("#submit").contains("Submit").click();
      cy.get("#message").should("contain", "Your reQuest was successfully created!")
    });

    xit("clicking the Log out button", () => {
      cy.get("#logout").click();
      cy.get("#logout").should("not.exist");
      expect("#").to.exist;
    });
  });

  xdescribe("unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:unsuccessful_login.json",
        headers: {
          uid: "user@mail.com",
        },
        status: 400,
      });
      cy.visit("/sign_in");
      cy.get("#login-form").within(() => {
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("wrongpassword");
        cy.get("Button").contains("Submit").click();
      });
    });
    it("with invalid credentials", () => {
      cy.get("#error-message").should(
        "contain",
        "Invalid login credentials. Please try again."
      );
    });
  });
});
