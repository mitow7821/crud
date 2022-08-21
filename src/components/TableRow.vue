<template>
  <tr
    :id="`album-${album.id}`"
    class="hover:bg-gray-50 focus:bg-gray-50"
    tabindex="0"
  >
    <td>{{ album.id }}</td>

    <td>{{ album.userId }}</td>

    <td class="whitespace-nowrap">{{ album.title }}</td>

    <td>
      <div class="flex gap-3 mt-auto text-sm">
        <router-link
          :to="`/${album.id}`"
          class="bg-blue-400 text-white px-4 py-1 rounded mt-auto whitespace-nowrap"
        >
          <i class="fa-solid fa-pen-to-square pr-2"></i>
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
  @apply p-2;
}
</style>
