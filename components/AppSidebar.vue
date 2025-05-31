<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "floating",
});

const routePath = useRoute().path;

// This is sample data.
const data = {
  navMain: [
    {
      title: "App",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: "lucide:layout-dashboard",
        },
        {
          title: "Connections",
          url: "/connections",
          icon: "lucide:server",
        },
        {
          title: "Modpacks",
          url: "/modpacks",
          icon: "mdi:minecraft",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Icon name="simple-icons:curseforge" size="18" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">ModpackMirror</span>
                <span class="">v0.0.1</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu class="gap-2">
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton as-child>
              <a :href="item.url" class="font-medium">
                {{ item.title }}
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length" class="ml-0 border-l-0 px-1.5">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="childItem.url === routePath">
                  <a :href="childItem.url">
                    <Icon :name="childItem.icon" size="16" />
                    {{ childItem.title }}
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
