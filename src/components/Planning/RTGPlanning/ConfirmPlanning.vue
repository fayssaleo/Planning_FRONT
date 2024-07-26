<template v-slot:text>
  <v-row class="confirmPlanningFirstRow" >
  </v-row>
  <v-row style="width: 100%" class="mt-0">
    <v-data-table
      :headers="headers"
      :items="thisPlanningBoxes"
      class="elevation-1 tableOfThePlanning"
      hide-default-footer
      :items-per-page="thisPlanningBoxes.length"
      style="width: 95%; margin: 0 auto"
    >
      <template v-slot:item="{ item }">
        <tr class="rowToEdit">
          <td>
            <span class="fullname"
              >{{
                item[0].firstname[0].toUpperCase() + item[0].firstname.slice(1)
              }}<br />
              {{ item[0].lastname.toUpperCase() }}</span
            >
          </td>
          <td>
            <span class="wh">{{ item[0].workingHours }}</span>
          </td>
          <td v-for="itemBox in item.slice(1)" :key="itemBox">
            <span v-if="itemBox == 'P'" class="pause">{{ itemBox }}</span>
            <span v-else-if="itemBox == 'DP'" class="doublePause">{{
              itemBox
            }}</span>
            <span v-else class="workBox">{{ itemBox.matricule }}</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  name: "RTG Show Planning",
  props: [
    "actualShift",
    "selectedDate",
    "selectedPlanning",
    "planningBoxes",
    "ShiftIndex",
  ],
  data() {
    return {
      thisPlanningBoxes: [],
      headers: [],
    };
  },
  computed: {
    // Add your computed properties here
  },
  methods: {
    // Add your methods here
  },
  created() {
    // Add your created hook code here
  },
  mounted() {
    this.thisPlanningBoxes = this.planningBoxes.slice(1).map((e) => {
      e.workingHours = e[0].workingHours;
      return e;
    });
    this.headers.push({
      text: this.planningBoxes[0][0],
      sortable: false,
      key: "driver",
      align: "start",
      title: this.planningBoxes[0][0],
    });
    this.headers.push({
      text: "WH",
      sortable: true,
      key: "driver",
      align: "start",
      title: "WH",
      value: "workingHours",
    });
    for (let index = 1; index < this.planningBoxes[0].length; index++) {
      this.headers.push({
        text: this.planningBoxes[0][index],
        sortable: false,
        key: index + this.planningBoxes[0][index],
        align: "start",
        title: this.planningBoxes[0][index].title,
      });
    }
  },
  watch: {
    // Add your watchers here
  },
  components: {
    // Add your child components here
  },
};
</script>

<style scoped>
.tableOfThePlanning {
  background-color: #cccccc36;
}

.workBox {
  padding-top: 16px;
  color: white;
  background-color: #0353a4;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
.pause {
  padding-top: 16px;
  color: white;
  background-color: #7d8597;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
.doublePause {
  padding-top: 16px;
  color: white;
  background-color: #81a4b1;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
.wh {
  padding-top: 16px;
  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
  margin-left: 1px;
  margin-right: 1px;
}
.fullname {
  padding-top: 5px;
  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 13px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
.saveButtonBar {
  color: white;
  background-color: #bec2c5;
  font-family: sans-serif;
  font-size: 13px;
  user-select: none;
  font-weight: bold;
  width: 90%;
  margin: 0 auto;
}
.saveButton {
  background-color: #4f7cac;
  color: white;
  width: 168px;
  float: right;
  position: absolute;
  right: 7px;
  top: 4px;
  font-size: 18px;
}
td {
  padding: 0 !important;
  text-align: center;
}
.rowToEdit td:nth-child(2) span {
  width: 98%;
}
.header {
  color: white;
  background-color: gray;
  font-family: sans-serif;
  font-size: 13px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
</style>
