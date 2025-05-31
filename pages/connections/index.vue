<script setup lang="ts">
import { toast } from "vue-sonner";

type SFTPServer = {
  id: string;
  name?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  modpack: {
    id?: string;
  };
};

type ApiResponse = {
  success: boolean;
  data: SFTPServer[];
};

const { data, error, refresh } = await useFetch<ApiResponse>("/api/v1/servers", {
  method: "GET",
});
const serverResult = computed(() => data.value?.data ?? []);

if (error.value) {
  toast.error("Error", { description: error.value?.data?.message || error.value?.message || "Failed to load servers" });
  console.error("Fehler:", error.value);
}
else if (data.value && !data.value.success) {
  toast.error("Error", { description: (data.value as any)?.message || "Failed to load servers" });
}
</script>

<template>
  <!-- slot content -->
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <header class="flex items-start justify-between">
      <div class="grow">
        <h1>Servers</h1>
      </div>
      <DialogsAddConnection @created="refresh()">
        <Button>
          <Icon name="material-symbols:add" />
          Add Connection
        </Button>
      </DialogsAddConnection>
    </header>

    <main class="grid gap-2">
      <section v-for="(item, index) in serverResult" :key="index">
        <CardsListConnection :key="item.id" :server="item" @changed="refresh()" />
      </section>
    </main>
    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
  </div>
</template>
