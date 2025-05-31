<script setup lang="ts">
import type { CurseForgeGetModResponseRaw } from "curseforge-api/v1/Types";

import millify from "millify";

const props = defineProps<{
  modpack: CurseForgeGetModResponseRaw["data"];
}>();

const emit = defineEmits<{}>();

const isDialogOpen = ref(false);
const selectedTab = ref("assign");

const infoItems = [
  {
    icon: "solar:user-bold",
    value: props.modpack.authors?.map(a => a.name).join(", ") || "Unknown Author",
  },
  {
    icon: "solar:tag-bold",
    value: props.modpack.categories?.map(c => c.name).join(", ") || "No Categories",
  },
  {
    icon: "solar:calendar-bold",
    value: new Date(props.modpack.dateCreated).toLocaleDateString(),
  },
  {
    icon: "solar:download-bold",
    value: millify(props.modpack.downloadCount),
  },
];
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <div class="flex flex-col sm:flex-row items-start gap-6 p-6">
        <NuxtImg
          :src="props.modpack.logo?.url || '/images/placeholder.png'"
          class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover mx-auto sm:mx-0" alt="Modpack Logo"
        />
        <div class="flex-1 flex flex-col justify-between h-full w-full">
          <div class="w-full flex flex-row items-center justify-between p-0">
            <DialogTitle class="text-left text-2xl sm:text-3xl">
              {{ props.modpack.name }}
            </DialogTitle>
          </div>
          <div class="p-0 mt-2">
            <DialogDescription class="text-base sm:text-lg mb-2">
              {{ props.modpack.summary }}
            </DialogDescription>
            <div class="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground mb-2">
              <div v-for="item in infoItems" :key="item.icon" class="flex items-center gap-1">
                <Icon size="18" :name="item.icon" class="opacity-30" />
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-stretch px-6 pb-6">
        <h3 class="text-lg font-semibold mb-2">
          Downloads
        </h3>
        <Tabs v-model="selectedTab" default-value="assign" class="w-full">
          <TabsList class="flex w-auto mb-4 gap-2">
            <TabsTrigger value="assign" :class="selectedTab !== 'assign' ? 'cursor-pointer' : ''">
              Assign
            </TabsTrigger>
            <TabsTrigger value="files" :class="selectedTab !== 'files' ? 'cursor-pointer' : ''">
              Files
            </TabsTrigger>
          </TabsList>
          <TabsContent value="assign">
            <ul class="overflow-hidden">
              <li v-for="n in 3" :key="`assign-${n}`" class="p-4 flex items-center justify-between">
                <span class="text-base">Dummy Assign {{ n }}</span>
                <Button>Assign</Button>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="files">
            <ul class="overflow-hidden">
              <li v-for="n in 3" :key="`files-${n}`" class="p-4 flex items-center justify-between">
                <span class="text-base">Dummy File {{ n }}</span>
                <Button>Download</Button>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  </Dialog>
</template>
