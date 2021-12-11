<template>
  <v-container>

  <h4>Create a new design</h4>
    <v-form v-model="valid">
      <v-text-field
        label="Plan Name"
        v-model="newDesign.name"
        required
      >
      </v-text-field>

      <v-text-field
          label="Plan Description"
          v-model="newDesign.description"
      >
      </v-text-field>

      <v-select
      v-bind:items="schools"
      label="School"
      v-model="selectedSchool"
      v-on:select="getDorms"
      required
      >
      </v-select>

      <v-select
          v-bind:items="dorms"
          label="Dorm"
          v-model="selectedDorm"
          required
      >
      </v-select>

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
      mounted: function () {
        this.$nextTick(function () {
          this.getSchools();
        })
      },

      valid: false,

      newDesign: {
        name: "",
        description: "",
        school: "",
        dorm: ""
      },

      selectedSchool: null,
      selectedDorm: null,
      schools: [],
      dorms: [],


      rules: {
        required: [(val) => val.length > 0 || "Required"],
        name: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        school: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        dorm: [(val) => /[a-z]/.test(val) || "Need lower case letter"]
      }
    }
  },
  methods: {
    handleSubmit: function () {
      this.planCreated = false;

      this.$axios
      .post("/create-design", {
        name: this.newDesign.name,
        description: this.newDesign.description,
        school: this.newDesign.school,
        dorm: this.newDesign.dorm
      })
    },

    getSchools: function () {
      this.$axios.get("/schools").then(response => {
        this.schools = response.data;
      })
    },
    getDorms: function () {
      this.$axios.get("/dorms")
          .then(response => {
        this.dorms = response.data;
      })
    }
  }
}

</script>

<style scoped>

</style>