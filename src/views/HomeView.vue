<script setup>
import { auth } from "@/firebase/db";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const goEmployees = () => {
  router.push("/employees");
};
const goDepartments = () => {
  router.push("/departments");
};
const goLogin = () => {
  signOut(auth);
  router.push("/login");
};
</script>

<template>
  <div class="h-screen w-full flex flex-col">
    <div
      class="w-full flex justify-between bg-green-600 text-white text-xl px-5 py-2"
    >
      <span>User Managment System</span>
      <span @click="goLogin()" class="cursor-pointer">Logout</span>
    </div>
    <div class="flex justify-around my-20">
      <div
        @click="goEmployees()"
        class="flex flex-col items-center cursor-pointer"
      >
        <img class="w-96 h-96" src="../assets/employees.webp" alt="" />
        <span class="text-2xl">Employees</span>
      </div>
      <div
        @click="goDepartments()"
        class="flex flex-col items-center cursor-pointer"
      >
        <img class="w-96 h-96" src="../assets/department.webp" alt="" />
        <span class="text-2xl">Departments</span>
      </div>
    </div>
  </div>
</template>
