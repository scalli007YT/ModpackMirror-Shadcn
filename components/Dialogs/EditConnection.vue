<template>
  <Form v-slot="{ handleSubmit }" keep-values :validation-schema="formSchema" :initial-values="initialValues">
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child>
        <slot />
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Connection</DialogTitle>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="SMP Server" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="steve.ds84a2b5" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="host">
            <FormItem>
              <FormLabel>host</FormLabel>
              <FormControl>
                <Input type="text" placeholder="sftp://node.steve-server.ovh:2022" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button type="submit" form="dialogForm">Update file</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner';

const props = defineProps<{
  server: {
    id: string
    name?: string
    host: string
    username: string
    password: string
  }
}>()

const initialValues = computed(() => ({
  name: props.server.name ?? '',
  username: props.server.username,
  host: props.server.host,
  password: props.server.password,
}))


const emit = defineEmits<{
  (e: 'edited'): void
}>()

const isDialogOpen = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(6).max(32),
  username: z.string().min(6).max(32),
  host: z.string().url({ message: 'Host must be a valid URL' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}))


async function onSubmit(values: any) {
  try {
    await $fetch('/api/v1/servers', {
      method: 'PUT',
      body: {
        id: props.server.id,
        name: values.name,
        username: values.username,
        host: values.host,
        password: values.password,
      },
    })
    toast.success('Connection updated', {
      description: 'The Connection was updated successfully',
    })
    isDialogOpen.value = false
    emit('edited')
  } catch (e: any) {
    const message = e?.data?.message || e?.message || 'Failed to update connection';
    toast.error('Error', {
      description: message,
    })
    console.error(e)
  }
}
</script>