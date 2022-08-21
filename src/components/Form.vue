<template>
  <div class="bg-white shadow p-10 rounded-md h-full flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <h1 class="font-semibold text-2xl">
        {{ isAlbumEdited ? `Edit album (ID: ${params.id})` : "Add new album" }}
      </h1>

      <router-link
        to="/"
        class="bg-blue-400 text-white px-5 py-1 rounded mt-auto self-start"
      >
        <i class="fa-solid fa-arrow-left pr-1.5"></i>
        Back
      </router-link>
    </div>

    <form @submit="handleSubmit" class="grow flex flex-col">
      <div class="grid justify-start gap-0.5">
        <span>Album title: </span>

        <input
          type="text"
          class="border rounded py-1 px-3 w-72"
          v-model="formData.title"
        />
      </div>

      <div class="flex gap-3 mt-auto">
        <button
          type="submit"
          class="bg-blue-400 text-white px-5 py-1.5 rounded"
        >
          <i class="fa-solid fa-floppy-disk pr-1.5"></i>
          Save
        </button>

        <RemoveButton v-if="isAlbumEdited" :albumId="+params.id" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import RemoveButton from "./RemoveButton.vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAlbum, addAlbum, editAlbum } from "../useAlbums";

const { params } = useRoute();
const router = useRouter();

const isAlbumEdited = params.id;
const defaultForm = {
  userId: Math.floor(Math.random() * 10),
  id: null,
  title: "",
};

const getAlbumData = async () => getAlbum(+params.id) ?? defaultForm;

const formData = reactive(isAlbumEdited ? await getAlbumData() : defaultForm);

async function handleSubmit(e: Event) {
  e.preventDefault();

  const albumId =
    isAlbumEdited && formData.id
      ? await editAlbum(+params.id, formData)
      : await addAlbum(formData);

  router.push({
    name: "Home",
    params: { albumId },
  });
}
</script>
