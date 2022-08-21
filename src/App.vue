<template>
  <div class="bg-gray-100 h-full p-10 md:p-5">
    <div
      class="
        bg-white
        shadow
        p-10
        rounded-md
        h-full
        flex flex-col
        gap-5
        overflow-hidden
        md:p-5
      "
    >
      <RouterView v-slot="{ Component }">
        <Suspense :timeout="0">
          <component :is="Component" />

          <template #fallback> Loading... </template>
        </Suspense>
      </RouterView>
    </div>
  </div>
</template>
