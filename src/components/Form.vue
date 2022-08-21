<template>
  <div class="flex items-center justify-between">
    <h1 class="font-semibold text-2xl">
      {{ isAlbumEdited ? `Edit album (ID: ${params.id})` : "Add new album" }}
    </h1>

    <router-link
      to="/"
      class="bg-blue-400 text-white px-5 py-1.5 rounded mt-auto self-start"
    >
      <div class="flex gap-1.5 items-center">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </div>
    </router-link>
  </div>

  <form @submit="handleSubmit" class="grow flex flex-col w-full">
    <div class="flex flex-col gap-0.5">
      <span>Album title: </span>

      <input
        type="text"
        class="border rounded py-1.5 px-3 w-72 md:w-full"
        v-model="formData.title"
      />
    </div>

    <div class="flex gap-3 mt-auto md:grid md:grid-cols-2">
      <button
        type="submit"
        class="
          bg-blue-400
          text-white
          px-5
          py-1.5
          rounded
          flex
          gap-2
          items-center
          md:justify-center
        "
      >
        <i class="fa-solid fa-floppy-disk"></i>
        Save
      </button>

      <RemoveButton
        v-if="isAlbumEdited"
        :albumId="+params.id"
        class="md:justify-center"
        @albumRemoved="handleRemove"
      />
    </div>
  </form>
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

function handleRemove() {
  router.push("/");
  alert("Album has been removed");
}
</script>
