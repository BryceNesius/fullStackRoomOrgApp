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
const DesignPlans = require("./models/design_plans");
const Dorm = require("./models/dorm");
const Favorites = require("./models/favorites");
const Furniture = require("./models/furniture");
const Ownership = require("./models/ownership");
const Room = require("./models/room");
const RoomFurniture = require("./models/furniture");
const School = require("./models/school");
const User = require("./models/user");
const UserFriends = require("./models/user_friends");

// Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require("joi");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  // Show routes.
  await server.register(require("blipp"));

  // Log stuff.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      transport: {
        target: "pino-pretty"
      }
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
