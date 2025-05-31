<script setup lang="ts">
defineProps<{ files: { name: string; type: string }[] }>();
</script>

<template>
  <section class="max-h-[60vh] overflow-y-auto grid gap-2 rounded-lg">
    <div v-for="(item, index) in files" :key="index" class="w-full bg-neutral-200 p-2 rounded-lg">
      <p class="flex items-center gap-2">
        <Icon v-if="item?.type === 'd'" size="20" name="material-symbols:folder" />
        <Icon v-else size="20" name="material-symbols:note" />
        <span>{{ item?.name }}</span>
      </p>
    </div>
  </section>
</template>
