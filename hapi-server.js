// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "pg.cse.taylor.edu", // PostgreSQL server
    user: "isaac_wickham", // Your user name
    password: "qijihiyo", // Your password
    database: "acorn", // Your database name
  },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const Account = require("./models/Account");
const School = require("./models/school");
const Dorm = require("./models/dorm");
const DesignPlan = require("./models/design_plans");
const Furniture = require("./models/furniture");
const Room = require("./models/room");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => "Well, hello there!",
    },

    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await Account.query().insert({
          first_name: request.payload.firstName,
          last_name: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
        });

        if (newAccount) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/myPlans/{id}/user",
      config: {
        description: "Retrieve all plans for a user."
      },
      handler: (request, h) => {
        return DesignPlan.query()
            .select("dorm", "name", "description")
            .where("last_name", request.params.id);

      }
    },

    {
      method: "GET",
      path: "/accounts",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return Account.query();
      },
    },

    {
      method: "GET",
      path: "/schools",
      config: {
        description: "Retrieve all the schools and their id's",
      },
      handler: () => {
        return School.query();
      },
    },

    {
      method: "GET",
      path: "/schools/{id}",
      config: {
        description: "Retrieve the a school by ID",
      },
      handler: (request) => {
        return School.query().where("school_id", request.params.id).first();
      },
    },

    {
      method: "GET",
      path: "/schools/{id}/dorms",
      config: {
        description: "Retrieve all dorms for a school",
      },
      handler: (request) => {
        return Dorm.query().where("school_id", request.params.id);
      },
    },

    {
      method: "POST",

      path: "/design-plan",
      config: {
        description: "Insert a new design plan.",
      },
      handler: (request) => {
        let thing = DesignPlan.query().insert(request.payload);
        return thing;
      },
    },

    {
      method: "DELETE",
      path: "/accounts/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return Account.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },
    {
      method: "PATCH",
      path: "/reset-password",
      config: {
        description: "Reset Password",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            oldPassword: Joi.string().min(8).required(),
            newPassword: Joi.string().min(8).required(),
            confirmNewPassword: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.oldPassword))
        ) {
          if (
            request.payload.newPassword === request.payload.confirmNewPassword
          ) {
            await account.query().patchAndFetch({
              password: request.payload.newPassword,
            });

            return {
              ok: true,
              msge: `Reset password successfully, user '${request.payload.email}'`,
            };
          }
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },

    {
      method: "POST",
      path: "/login",
      config: {
        description: "Log in",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.password))
        ) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: account.id,
              firstName: account.first_name,
              lastName: account.last_name,
              email: account.email,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },
  ]);

  // Start the server.
  await server.start();
}

// Go!
init();
