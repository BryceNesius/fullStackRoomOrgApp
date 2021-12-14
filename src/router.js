import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import feed from "./pages/feed.vue";
import Accounts from "./pages/Accounts.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import CreateDesign from "./pages/CreateDesign";
import myPlans from "./pages/myPlans";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "feed", path: "/feed", component: feed },
    { name: "accounts", path: "/accounts", component: Accounts },
    { name: "reset-password", path: "/reset-password", component: ResetPassword},
    { name: "create-design", path: "/create-design", component: CreateDesign},
    { name: "myPlans", path: "/myPlans", component: myPlans}
  ]
});
