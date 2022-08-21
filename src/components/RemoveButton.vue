<template>
  <button
    v-bind="$attrs"
    type="button"
    @click="handleRemove"
    class="bg-red-400 text-white px-5 p-1.5 rounded mt-auto"
  >
    <i class="fa-solid fa-trash-can pr-2"></i>
    {{ "Remove" }}
  </button>
</template>

<script setup lang="ts">
import { removeAlbum } from "../useAlbums";

const props = defineProps<{
  albumId: number;
}>();

function handleRemove() {
  const result = confirm("Are you sure you want to proceed?");

  if (result) {
    removeAlbum(props.albumId);
  }
}
</script>
