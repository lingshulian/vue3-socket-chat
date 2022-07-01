<template>
  <header class="text-left px-20px h-35px">
    <span class="fw-600">{{ store.recipient?.email }}</span>
  </header>
</template>

<script setup lang="ts">
  import { useMainStore } from "@/store/main"
  const store = useMainStore()
</script>
