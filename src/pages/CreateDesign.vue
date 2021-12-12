
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
      :items="schools"
      item-text="name"
      label="School"
      item-id="school_id"
      v-model="selectedSchool"
      :value="schools.school_id"
      @input="getStuff"
      required
      >
      </v-select>

      <v-select
          :items="dorms"
          item-text="name"
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
      schoolID: null,


      rules: {
        required: [(val) => val.length > 0 || "Required"],
        name: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        school: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        dorm: [(val) => /[a-z]/.test(val) || "Need lower case letter"]
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.getSchools();

    })
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

    getSchools: async function () {
      this.$axios.get("/schools")
          .then(response => {
          this.schools = response.data;
          console.log(response.data);

      })
          .catch((err) => this.showDialog("Error", err));
    },
    getDorms: function () {
      this.$axios.get("/dorms", { params: { school_id: this.schoolID } })
          .then(response => {
        this.dorms = response.data;
      })
    },
    getStuff: function () {
      this.$axios.get("/school", {params: {id: this.selectedSchool}})
          .then(response => {
            this.schoolID = response.data.school_id;
            this.getDorms();
          })
    },

  }
}

</script>

<style scoped>

</style>