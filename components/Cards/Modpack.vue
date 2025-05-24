<template>
  <Card class="rounded-lg p-4">
    <div class="flex flex-row items-start">
      <NuxtImg :src="modpack.logo?.url || '/images/placeholder.png'" class="w-24 h-24 rounded-sm object-cover"
        alt="Modpack Logo" />
      <div class="flex-1 flex flex-col justify-between h-full">
        <CardHeader class="w-full flex flex-row items-center justify-between">
          <CardTitle class="text-left">{{ modpack.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <Icon size="20" name="solar:server-2-bold" />
            <span>{{ modpack.summary }}</span>
          </div>
        </CardContent>

        <CardFooter>
          <div class="flex items-center gap-2">
            <Icon size="20" name="solar:download-bold" />
            <span>{{ modpack.downloadCount }}</span>
          </div>
        </CardFooter>
      </div>
      <Button class="w-24 h-24" variant="outline">Assign</Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { CurseForgeGetModResponseRaw } from 'curseforge-api/v1/Types';

const props = defineProps<{
  modpack: CurseForgeGetModResponseRaw['data']
}>()

</script>
