<script setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth } from "./firebase/db";

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.replace("/login");
    } else if (route.path == "/login" || route.path == "/register") {
      router.replace("/");
    }
  });
});
</script>

<template>
  <RouterView />
</template>
