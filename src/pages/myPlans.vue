<template>
  <v-data-table
      :headers="headers"
      :items="plans"
      :items-per-page="5"
      class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "myPlans",

  data: function () {
    return {

      headers: [
        {
        text: 'Plan Name',
        align: 'start',
        sortable: false,
        value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Dorm', value: 'dorm' },
        ],

      plans: [],
    }
  },
  mounted() {
    this.getPlans();
  },

  methods: {
    getPlans: function () {
      this.$axios.get("/myPlans", { params: {id: this.$store.state.currentAccount.lastName}})
      .then((response) => {
        this.plans = response.data;
      });
    }
  }
}
</script>

<style scoped>

</style>