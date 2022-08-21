<template>
  <div class="bg-gray-100 h-screen p-10">
    <RouterView v-slot="{ Component }">
      <Suspense :timeout="0">
        <component :is="Component" />

        <template #fallback> Loading... </template>
      </Suspense>
    </RouterView>
  </div>
</template>
