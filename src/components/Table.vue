<template>
  <div class="flex justify-between md:flex-col gap-3">
    <router-link
      to="/add"
      class="bg-blue-400 text-white px-3 py-1.5 rounded mt-auto"
    >
      <div class="flex gap-2 items-center md:justify-center">
        <i class="fa-solid fa-plus"></i>
        Add album
      </div>
    </router-link>

    <input
      type="text"
      class="border rounded py-1.5 px-3"
      v-model="searchValue"
      placeholder="Search for albums"
    />
  </div>

  <div class="overflow-auto">
    <table class="w-full">
      <tr class="md:hidden">
        <th class="w-1/12">Id</th>
        <th class="w-1/12 whitespace-nowrap">User Id</th>
        <th class="w-7/12">Title</th>
        <th class="w-3/12">Actions</th>
      </tr>

      <TableRow v-for="album in visibleAlbums" :key="album.id" :album="album" />
    </table>
  </div>
</template>

<script setup lang="ts">
import TableRow from "./TableRow.vue";
import { albums } from "../useAlbums";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const searchValue = ref("");
const visibleAlbums = computed(() =>
  albums.value.filter((album) =>
    Object.values(album).some((e) =>
      `${e}`.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  )
);

onMounted(() => {
  if (params.albumId) {
    const row = document.querySelector<HTMLTableRowElement>(
      `#album-${params.albumId}`
    );

    row?.scrollIntoView({
      block: "center",
    });

    row?.focus();
  }
});
</script>

<style scoped>
tr {
  @apply first:border-none border-t;
}
tr > th {
  @apply bg-gray-100 p-2 font-medium text-left sticky top-0;
}
</style>
