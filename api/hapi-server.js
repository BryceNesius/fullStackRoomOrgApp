// Configure Knex.
const Joi = require("joi");
// Change to acorns database
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "pg.cse.taylor.edu",
    user: "acorn",
    password: "qijihiyo",
    database: "acorn",
  },
});

// Configure Objection.
const { Model } = require("objection");
Model.knex(knex);

// Load model classes.
const Design_Plans = require("/Users/bnesius/acorns/Monkey/api/models/design_plans");
const Dorm = require("/Users/bnesius/acorns/Monkey/api/models/dorm");
const Favorites = require("/Users/bnesius/acorns/Monkey/api/models/favorites");
const Furniture = require("/Users/bnesius/acorns/Monkey/api/models/furniture");
const Ownership = require("/Users/bnesius/acorns/Monkey/api/models/ownership");
const Room = require("/Users/bnesius/acorns/Monkey/api/models/room");
const Room_Furniture = require("/Users/bnesius/acorns/Monkey/api/models/furniture");
const School = require("/Users/bnesius/acorns/Monkey/api/models/school");
const User = require("/Users/bnesius/acorns/Monkey/api/models/user");
const User_Friends = require("/Users/bnesius/acorns/Monkey/api/models/user_friends");


// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  // Log stuff.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => "Hello, Hapi",
    },

  ]);

  console.log("Server listening on", server.info.uri);
  await server.start();
};

init();
