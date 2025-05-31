<script lang="ts" setup>
</script>

<template>
  <div>
    <SidebarProvider :style="{ '--sidebar-width': '19rem' }">
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 justify-between items-center px-4">
          <SidebarTrigger class="-ml-1" />
          <ModeToggle />
        </header>
        <slot />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
