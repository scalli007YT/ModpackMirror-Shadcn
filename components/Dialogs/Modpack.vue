<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <div class="flex flex-col sm:flex-row items-start gap-6 p-6">
        <NuxtImg :src="props.modpack.logo?.url || '/images/placeholder.png'"
          class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover mx-auto sm:mx-0" alt="Modpack Logo" />
        <div class="flex-1 flex flex-col justify-between h-full w-full">
          <CardHeader class="w-full flex flex-row items-center justify-between p-0">
            <DialogTitle class="text-left text-2xl sm:text-3xl">{{ props.modpack.name }}</DialogTitle>
          </CardHeader>
          <CardContent class="p-0 mt-2">
            <DialogDescription class="text-base sm:text-lg mb-2">{{ props.modpack.summary }}</DialogDescription>
            <div class="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground mb-2">
              <div class="flex items-center gap-1">
                <Icon size="18" name="solar:user-bold" class="opacity-30" />
                <span>{{props.modpack.authors?.map(a => a.name).join(', ') || 'Unknown Author'}}</span>
              </div>

              <div class="flex items-center gap-1">
                <Icon size="18" name="solar:tag-bold" class="opacity-30" />
                <span>{{props.modpack.categories?.map(c => c.name).join(', ') || 'No Categories'}}</span>
              </div>

              <div class="flex items-center gap-1">
                <Icon size="18" name="solar:calendar-bold" class="opacity-30" />
                <span>{{ new Date(props.modpack.dateCreated).toLocaleDateString() }}</span>
              </div>

              <div class="flex items-center gap-1">
                <Icon size="18" name="solar:download-bold" class="opacity-30" />
                <span>{{ millify(props.modpack.downloadCount) }}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <CardFooter class="flex flex-col items-stretch px-6 pb-6">
        <h3 class="text-lg font-semibold mb-2">Downloads</h3>
        <ul class="overflow-hidden">
          <li v-for="n in 3" :key="n" class="p-4 flex items-center justify-between">
            <span class="text-base">Dummy Download {{ n }}</span>
            <Button>Download</Button>
          </li>
        </ul>
      </CardFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { CurseForgeGetModResponseRaw } from 'curseforge-api/v1/Types';
import millify from 'millify';

const emit = defineEmits<{}>()

const props = defineProps<{
  modpack: CurseForgeGetModResponseRaw['data']
}>()

const isDialogOpen = ref(false)
</script>