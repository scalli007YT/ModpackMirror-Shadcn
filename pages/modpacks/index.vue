<template>
  <!-- slot content -->
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">

    <header class="flex items-start justify-between">
      <div class="grow">
        <h1>Modpacks</h1>
      </div>
    </header>


    <section>
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchInput" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Icon name="material-symbols:search" class="size-6 text-muted-foreground" />
        </span>
      </div>
    </section>

    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-2 overflow-hidden">
      <div class="flex items-center space-x-4" v-if="pending">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <div class="flex items-center space-x-4" v-if="data?.data.length === 0 && !error && !pending">
        <Icon name="material-symbols:error-outline" class="size-6 text-red-500" />
        <span class="text-red-500">Try searching again!</span>
      </div>
      <div class="max-h-[75vh] overflow-y-auto flex flex-col gap-y-4 rounded-xl p-2">
        <section v-for="(item, index) in searchResult" :key="index">
          <CardsModpack :modpack="item" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurseForgeGetModResponseRaw } from 'curseforge-api/v1/Types';
import { toast } from 'vue-sonner';

type Modpack = CurseForgeGetModResponseRaw['data'];

interface ApiResponse {
  success: boolean;
  data: Modpack[];
  message?: string;
  error?: string;
}

const searchInput = ref('ATM');

const { data, error, pending } = useFetch<ApiResponse>('/api/v1/modpacks', {
  method: 'GET',
  params: { search: searchInput },
  watch: [searchInput],
})

if (error.value) {
  toast.error('Error', { description: error.value?.data?.message || error.value?.message || 'An error occurred while loading modpacks' });
} else if (data.value && !data.value.success) {
  toast.error('Error', { description: data.value?.message || 'Failed to load modpacks' });
} else if (data.value && data.value.success) {
  toast.success('Success', { description: 'Modpacks loaded successfully' });
}

const searchResult = computed(() => data.value?.data ?? []);
</script>