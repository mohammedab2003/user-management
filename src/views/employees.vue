<script setup>
import { onMounted, ref } from "vue";
import { db } from "../firebase/db.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

const emp = ref([]);
const dep = ref([]);
const n = ref("");
const a = ref("");
const d = ref("");

const upt = ref(false);
const add = ref(false);
const selectEmp = ref("");

const employee = collection(db, "employees");
const department = collection(db, "departments");
onMounted(() => {
  try {
    onSnapshot(employee, (snap) => {
      emp.value = snap.docs.map((element) => {
        return {
          id: element.id,
          name: element.data().name,
          age: element.data().age,
          department_id: element.data().department_id,
        };
      });
    });
    onSnapshot(department, (snap) => {
      dep.value = snap.docs.map((element) => {
        return {
          id: element.id,
          name: element.data().name,
          address: element.data().address,
        };
      });
    });
  } catch (err) {
    console.log(err);
  }
});

const addEmp = async () => {
  await addDoc(collection(db, "employees"), {
    name: n.value,
    age: a.value,
    department_id: d.value,
  });
  n.value = "";
  a.value = "";
  d.value = "";
  add.value = !add.value;
};

const deleteEmp = async (delete_id) => {
  await deleteDoc(doc(db, "employees", delete_id));
};

const selectUpt = (id) => {
  selectEmp.value = id;
  upt.value = !upt.value;
  n.value = "";
  a.value = "";
  d.value = "";
};

const selectAdd = () => {
  add.value = !add.value;
  n.value = "";
  a.value = "";
  d.value = "";
};
const updateEmp = async () => {
  await updateDoc(doc(db, "employees", selectEmp.value), {
    name: n.value,
    age: a.value,
    department_id: d.value,
  });
  n.value = "";
  a.value = "";
  d.value = "";
  upt.value = !upt.value;
};

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div
    v-if="emp.length == 0 || dep.length == 0"
    class="w-full gap-x-2 flex justify-center items-center h-screen"
  >
    <div
      class="w-[48px] h-[48px] m-auto relative before:content-[''] before:w-[48px] before:h-[5px] before:bg-[#f0808050] before:absolute before:top-[60px] before:left-[0px] before:rounded-[50%] before:animate-[shadow324_0.5s_linear_infinite] after:content-[''] after:w-[100%] after:h-[100%] after:bg-[#f08080] after:absolute after:top-[0px] after:left-[0px] after:rounded-[4px] after:animate-[jump7456_0.5s_linear_infinite]"
    ></div>
  </div>
  <div v-if="emp.length > 0 && dep.length > 0" class="w-full py-6">
    <div class="h-screen w-full flex flex-col">
      <div
        class="w-full flex justify-between bg-green-600 text-white text-xl px-5 py-2"
      >
        <span>User Managment System</span>
        <span @click="goHome()" class="cursor-pointer">Home</span>
      </div>

      <div
        v-if="upt"
        class="flex flex-col items-center justify-center h-screen dark fixed w-full bg-gray-100"
      >
        <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-200 mb-4">
            Update Employee { {{ selectEmp }} }
          </h2>

          <div class="flex flex-col">
            <input
              v-model="n"
              placeholder="Full Name"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              v-model="a"
              placeholder="age"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
            />
            <select
              v-model="d"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="department"
            >
              <option v-for="d in dep" :key="d" :value="d.id">
                {{ d.name }}
              </option>
            </select>

            <button
              @click="updateEmp()"
              class="bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-green-500 transition ease-in-out duration-150"
            >
              update
            </button>

            <button
              @click="selectUpt()"
              class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="add"
        class="flex flex-col items-center justify-center h-screen dark fixed w-full bg-gray-100"
      >
        <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-200 mb-4">Add Employee</h2>

          <div class="flex flex-col">
            <input
              v-model="n"
              placeholder="Full Name"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              v-model="a"
              placeholder="age"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
            />
            <select
              v-model="d"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="department"
            >
              <option v-for="d in dep" :key="d" :value="d.id">
                {{ d.name }}
              </option>
            </select>

            <button
              @click="addEmp()"
              class="bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-green-500 transition ease-in-out duration-150"
            >
              Add
            </button>

            <button
              @click="selectAdd()"
              class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="text-3xl flex w- justify-center my-10">
        <span>Employees Table</span>
      </div>

      <div class="flex justify-center">
        <button
          @click="add = !add"
          class="bg-green-600 text-white p-2 rounded-full"
        >
          Add Employee
        </button>
      </div>

      <div class="mt-5 px-5 w-full" v-if="emp.length > 0">
        <table class="w-full border-black border">
          <thead class="text-left">
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>WORK IN</th>
            <th>ACTIONS</th>
          </thead>
          <tbody v-for="e in emp" :key="e" class="border border-black">
            <td>{{ e.id }}</td>
            <td>{{ e.name }}</td>
            <td>{{ e.age }}</td>
            <td>{{ e.department_id }}</td>
            <td>
              <button
                @click="deleteEmp(e.id)"
                class="rounded-full text-red-500 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button @click="selectUpt(e.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
td,
th {
  border: solid 1px black;
  padding-left: 10px;
}
</style>
