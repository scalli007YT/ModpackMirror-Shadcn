<template>
  <div class="cursor-pointer" @click="toast.warning('This feature is not implemented yet!')">
    <Card class="rounded-xl p-4 sm:p-6 cursor-pointer">
      <div class="flex flex-col sm:flex-row items-start sm:items-start gap-4 sm:gap-6">
        <NuxtImg :src="modpack.logo?.url || '/images/placeholder.png'"
          class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover mx-auto sm:mx-0" alt="Modpack Logo" />
        <div class="flex-1 flex flex-col justify-between h-full w-full">
          <CardHeader class="w-full flex flex-row items-center justify-between p-0">
            <CardTitle class="text-left text-lg sm:text-xl">{{ modpack.name }}</CardTitle>
          </CardHeader>
          <CardContent class="p-0 mt-2">
            <div class="flex items-center gap-2">
              <Icon size="20" name="solar:server-2-bold" class="opacity-30" />
              <span class="text-sm sm:text-base">{{ modpack.summary }}</span>
            </div>
          </CardContent>
          <CardFooter class="p-0 mt-2">
            <div class="flex items-center gap-2">
              <Icon size="20" name="solar:download-bold" class="opacity-30" />
              <span class="text-sm sm:text-base">{{ modpack.downloadCount }}</span>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { CurseForgeGetModResponseRaw } from 'curseforge-api/v1/Types';

const props = defineProps<{
  modpack: CurseForgeGetModResponseRaw['data']
}>()

</script>
