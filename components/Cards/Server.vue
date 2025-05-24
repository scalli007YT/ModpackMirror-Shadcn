<template>
  <div class="flex-1 items-stretch gap-2">
    <Card class="h-full">
      <CardHeader class="w-full flex flex-row items-center justify-between">
        <CardTitle class="text-left">{{ server.name }}</CardTitle>
        <DialogsEditConnection :server="server" @edited="emit('changed')">
          <Icon name="material-symbols:edit-rounded" @click="" size="18" class="cursor-pointer" />
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

        <NuxtLink :to="hasVersion
          ? { path: '/modpacks' }
          : { path: '/connections/' + server.id, query: { host: server.host, password: server.password } }">
          <Button>
            <Icon :name="hasVersion ? 'material-symbols:tools-wrench' : 'material-symbols:gfit-health'" />
            {{ hasVersion ? 'Manage Modpack' : 'Fix File' }}
          </Button>
        </NuxtLink>

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
              <AlertDialogAction @click="deleteServer(server.id)">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';


const props = defineProps<{
  server: {
    id: string
    name?: string
    host: string
    username: string
    password: string
    modpack: {
      id?: string
    }
  }
}>()

const emit = defineEmits<{
  (e: 'changed'): void
}>()


interface FileEntry {
  name: string
  type: string
}

interface ApiResponse {
  success: boolean
  files: FileEntry[]
}

// const { data, error } = await useFetch<ApiResponse>('/api/v1/serverfiles/sftp-connect', {
//   method: 'POST',
//   body: {
//     connectionUrl: props.server.host,
//     username: props.server.username,
//     password: props.server.password,
//   },
// })

// if (error.value) {
//   const message = error.value?.data?.message || error.value?.message || 'Failed to fetch server files';
//   toast('Error', {
//     description: message,
//   })
//   console.error('Fehler:', error.value)
// }

const deleteServer = async (id: string) => {
  const { data, error } = await useFetch<{ success: boolean; message?: string }>('/api/v1/servers', {
    method: 'DELETE',
    body: { id },
  });
  if (error.value) {
    const message = error.value?.data?.message || error.value?.message || 'Failed to delete server';
    toast('Error', {
      description: message,
    });
    console.error(error.value);
    return;
  }
  if (data.value?.success) {
    toast('Server deleted', {
      description: 'The server was deleted successfully',
    });
    emit('changed');
  } else {
    toast('Error', {
      description: data.value?.message || 'Failed to delete server',
    });
  }
}



const VersioningFileName = useRuntimeConfig().public.VersioningFileName
// const fileResult = computed(() => data.value?.files ?? [])
// const hasVersion = computed(() => fileResult.value.some(item => item.name === VersioningFileName))
const fileResult = null
const hasVersion = true
</script>
