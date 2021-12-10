<template>
  <v-container>

  <h4>Create a new design</h4>
    <v-form v-model="valid">
      <v-text-field
        label="Plan Name"
        v-model="createDesign.name"
        required
      >
      </v-text-field>

      <v-text-field
          label="Plan Description"
          v-model="createDesign.description"
      >
      </v-text-field>

      <v-text-field
          label="What school is this plan for?"
          v-model="createDesign.school"
          required
      >
      </v-text-field>
      <v-text-field
          label="What dorm is this plan for?"
          v-model="createDesign.dorm"
          required
      >
      </v-text-field>

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

      createDesign: {
        name: "",
        description: "",
        school: "",
        dorm: ""


      },
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        name: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        school: [(val) => /[a-z]/.test(val) || "Need lower case letter"],
        dorm: [(val) => /[a-z]/.test(val) || "Need lower case letter"]
      }
    }
  }
}

</script>

<style scoped>

</style>