import CustomizedAxios from "../../../plugins/axios";
const boxModule = {
  state: {
    planningBoxes: [],
    planningWithTheBoxes: null,
    storageData: {
      actualShift: null,
      selectedDate: null,
      selectedPlanning: null,
      ShiftIndex: null,
    },
    justCreated: false,
  },
  mutations: {
    SET_PLANNING_BOXES(state, payload) {
      state.planningBoxes = payload;
    },
    SET_PLANNING_WITH_THE_BOXES(state, payload) {
      state.planningWithTheBoxes = payload;
    },
    CLEAR_BOXES(state) {
      state.planningWithTheBoxes.planning_boxes = null;
    },
    CLEAR_PLANNING(state) {
      state.planningWithTheBoxes=null;
      state.storageData = {
        actualShift: null,
        selectedDate: null,
        selectedPlanning: null,
        ShiftIndex: null,
      };
    },
    SET_PLANNING_FROM_THE_FRONTEND(state, payload) {
      state.planningWithTheBoxes = {
        planning: payload,
        planning_boxes: null,
      };
    },
    SET_PLANNING_AND_BOXES(state, payload) {
      console.log("this planning with boxes", payload.planning_boxes);
      let headerArray = payload.planning.planning_header.split(".");
      headerArray=headerArray.map((e)=>{
        return {
          title: e,
        }
      });
      headerArray.unshift("Drivers | Time");
      payload.planning_boxes.unshift(headerArray);
      state.planningWithTheBoxes = {
        planning: payload.planning,
        planning_boxes: payload.planning_boxes,
      };
      state.storageData.actualShift = payload.planning.shift;
      state.storageData.selectedDate = new Date(
        payload.planning.planned_at
      );
      state.storageData.selectedPlanning = {
        shift_id: state.storageData.actualShift.id,
        profile_group_id: payload.planning.profile_group_id,
        planned_at: payload.planning.planned_at,
        shift_periode: payload.planning.shift_periode_index,
      };

      state.storageData.ShiftIndex = console.log(
        "mnb3d",
        payload.planning_boxes
      );
    },
    SET_BOXES_FROM_THE_FRONTEND(state, payload) {
      state.planningWithTheBoxes.planning_boxes = payload;
    },
    SET_STORAGE_DATA(state, payload) {
      state.storageData = payload;
    },
    CLEAR_STORAGE_DATA(state, payload) {
      state.storageData = null;
    },
    SET_JUSTE_CREATED(state, payload) {
      state.justCreated = payload;
    },
  },
  actions: {
    SetPlanningByIdAndBoxesAction({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/getPlanningByIdAndBoxes", data)
          .then((response) => {
            commit("SET_PLANNING_AND_BOXES", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    CreatePlanningWitchTheBoxes({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/addPlanningAndBoxes", data)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //--------------------------------------------------------------
    addPlanningBoxesAction({ commit, state }, planningBoxes) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/addPlanningBoxes", planningBoxes)
          .then((response) => {
            commit("SET_PLANNING_BOXES", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setBoxAction({ commit, state }, box) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/add", box)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setPlanningBoxes({ commit, state }, planning) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/getByPlanning", planning)
          .then((response) => {
            commit("SET_PLANNING_BOXES", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setBoxUpdateAction({ commit, state }, box) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("boxes/update", box)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    clearBoxes({ commit, state }) {
      commit("CLEAR_BOXES");
    },
    clearPlanning_new({ commit, state }) {
      commit("CLEAR_PLANNING");
    },
    setPlanningFromTheFrontend({ commit, state }, planning) {
      commit("SET_PLANNING_FROM_THE_FRONTEND", planning);
    },
    setBoxesFromTheFrontend({ commit, state }, plannig_boxes) {
      commit("SET_BOXES_FROM_THE_FRONTEND", plannig_boxes);
    },
    setStorageData({ commit, state }, storage_data) {
      commit("SET_STORAGE_DATA", storage_data);
    },
    clearStorageData({ commit, state }, storage_data) {
      commit("CLEAR_STORAGE_DATA", storage_data);
    },
    setJustCreated({ commit, state }, created) {
      commit("SET_JUSTE_CREATED", created);
    },
  },
  getters: {
    getPlanningBoxes(state) {
      return state.planningBoxes;
    },
    getPlanningWithTheBoxes(state) {
      return state.planningWithTheBoxes;
    },
    getStorageData(state) {
      return state.storageData;
    },
    getJustCreated(state) {
      return state.justCreated;
    },
  },
};
export default boxModule;
