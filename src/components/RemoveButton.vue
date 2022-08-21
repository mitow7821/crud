<template>
  <button
    v-bind="$attrs"
    type="button"
    @click="handleRemove"
    class="
      bg-red-400
      text-white
      px-5
      p-1.5
      rounded
      mt-auto
      flex
      gap-2
      items-center
    "
  >
    <i class="fa-solid fa-trash-can"></i>
    Remove
  </button>
</template>

<script setup lang="ts">
import { removeAlbum } from "../useAlbums";

const emit = defineEmits(["albumRemoved"]);
const props = defineProps<{
  albumId: number;
}>();

function handleRemove() {
  const result = confirm("Are you sure you want to proceed?");

  if (result) {
    removeAlbum(props.albumId);
    emit("albumRemoved", props.albumId);
  }
}
</script>
