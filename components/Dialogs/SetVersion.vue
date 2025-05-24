<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child>
        <Button class="bg-green-500">Create file</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Modpack Version</DialogTitle>
          <DialogDescription>
            Enter the currently installed modpack version, in the format listed in Curseforge
          </DialogDescription>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="version">
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input type="text" placeholder="All the Mods 10-2.47" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button type="submit" form="dialogForm">Create file</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
const route = useRoute()

import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

const emit = defineEmits<{
  (e: 'created'): void
}>()

const props = defineProps<{
  versioningFileName: string
}>()
const isDialogOpen = ref(false)

const formSchema = toTypedSchema(z.object({
  version: z.string().min(6).max(32),
}))

async function onSubmit(values: any) {
  try {
    await $fetch('/api/v1/serverfiles', {
      method: 'POST',
      body: {
        connectionUrl: route?.query?.host,
        username: route?.params?.id,
        password: route?.query?.password,
        filename: props.versioningFileName,
        content: values.version
      }
    })
    toast({ title: 'File created', description: 'The file was created successfully' })
    isDialogOpen.value = false
    emit('created')
  } catch (e) {
    console.error(e)
  }
}
</script>