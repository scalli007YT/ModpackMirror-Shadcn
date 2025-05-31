<script setup lang="ts">
const props = defineProps<{
  server: {
    id: string;
    name?: string;
    host: string;
    username: string;
    password: string;
    modpack: {
      id?: string;
    };
  };
}>();

const emit = defineEmits<{
  (e: "changed"): void;
}>();
</script>

<template>
  <div class="flex-1 items-stretch gap-2">
    <Card class="h-full">
      <CardHeader class="w-full flex flex-row items-center justify-between">
        <CardTitle class="text-left">
          {{ server.name }}
        </CardTitle>
        <DialogsEditConnection :server="server" @edited="emit('changed')">
          <Icon name="material-symbols:edit-rounded" size="18" class="cursor-pointer" />
        </DialogsEditConnection>
      </CardHeader>

      <CardContent>
        <div class="flex items-center gap-2">
          <Icon size="20" name="solar:server-2-bold" />
          <span>{{ server.host }}</span>
        </div>
        <div v-if="server.modpack?.id" class="flex items-center gap-2">
          <Icon size="20" name="mdi:minecraft" />
          <span>{{ server.modpack.id }}</span>
        </div>
      </CardContent>
      <CardFooter class="flex items-center justify-between">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">
              <Icon name="material-symbols:delete" />
              Delete Connection
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your connection
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>
