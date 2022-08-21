<template>
  <tr
    :id="`album-${album.id}`"
    class="hover:bg-gray-50 focus:bg-gray-50 md:grid md:py-2"
    tabindex="0"
  >
    <td>
      <span class="hidden md:inline">Id: </span>
      <span>{{ album.id }}</span>
    </td>

    <td>
      <span class="hidden md:inline">User Id: </span>
      <span>{{ album.userId }}</span>
    </td>

    <td class="min-w-[15rem]">
      <span class="hidden md:inline">Title: </span>
      <span>{{ album.title }}</span>
    </td>

    <td>
      <div class="flex gap-3 mt-auto text-sm">
        <router-link
          :to="`/${album.id}`"
          class="
            bg-blue-400
            text-white
            px-4
            py-1
            rounded
            mt-auto
            whitespace-nowrap
            flex
            gap-2
            items-center
          "
        >
          <i class="fa-solid fa-pen-to-square"></i>
          Edit
        </router-link>

        <RemoveButton :albumId="album.id" class="px-2 py-1" />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { AlbumItem } from "../useAlbums";
import RemoveButton from "./RemoveButton.vue";

defineProps<{
  album: AlbumItem;
}>();
</script>

<style scoped>
tr > td {
  @apply p-2 md:p-0.5;
}
</style>
