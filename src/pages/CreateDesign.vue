<template>
  <v-container>
    <h4>Create a new design</h4>
    <v-form v-model="valid">


      <v-text-field
        label="Plan Name"
        v-model="newDesign.name"
        :rules="rules.required"
      />

      <v-text-field
        label="Plan Description"
        v-model="newDesign.description"
        :rules="rules.required"
      />

      <v-select
        :items="schools"
        item-text="name"
        item-value="school_id"
        label="School"
        v-model="newDesign.selectedSchool"
        @change="getDorms()"
        :rules="rules.selected"
      />

      <v-select
        :disabled="newDesign.selectedSchool < 0"
        :items="dorms"
        item-text="name"
        item-value="dorm_id"
        label="Dorm"
        v-model="newDesign.selectedDorm"
        :rules="rules.selected"
      />

      <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
        >Create Plan
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "CreateDesign",

  data: function () {
    return {
      valid: false,

      newDesign: {
        name: "",
        description: "",
        selectedSchool: -1,
        selectedDorm: -1,
      },

      schools: [],
      dorms: [],

      rules: {
        required: [(val) => val.length > 0 || "Required"],
        selected: [(val) => val >= 0 || "Required"],
      },
    };
  },

  mounted() {
    this.getSchools();
  },

  methods: {
    handleSubmit: function () {
      this.planCreated = false;

      this.$axios.post("/design-plan", {
        first_name: this.$store.state.currentAccount.firstName,
        last_name: this.$store.state.currentAccount.lastName,
        name: this.newDesign.name,
        description: this.newDesign.description,
        dorm: this.newDesign.selectedDorm,
      })
      .then((result) => {
        if (result.status === 200) {
          this.$router.push({ name: "myPlans" });
        }
      })
      .catch((err) => this.showDialog("Failed", err));
    }, // end of handle submit

    getSchools: function () {
      this.$axios
        .get("/schools")
        .then((response) => {
          this.schools = response.data;
          console.log(response.data);
        })
        .catch((err) => this.showDialog("Error", err));
    },

    getDorms: function () {
      this.$axios
        .get(`/schools/${this.newDesign.selectedSchool}/dorms`)
        .then((response) => {
          this.dorms = response.data;
        });
    },

  },
};
</script>

<style scoped></style>
