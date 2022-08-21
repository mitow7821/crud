import axios from "axios";
import { ref, watch } from "vue";
import { router } from "./main";

interface AlbumItem {
  userId: number;
  id: number;
  title: string;
}

const albums = ref<AlbumItem[]>([]);
const apiUrl = "https://jsonplaceholder.typicode.com/albums";

watch(
  albums,
  (value) => {
    localStorage.setItem("albums", JSON.stringify(value));
  },
  { deep: true }
);

const getAlbums = async () => {
  const storageAlbums = localStorage.getItem("albums");

  albums.value = storageAlbums
    ? JSON.parse(storageAlbums)
    : await axios.get(apiUrl).then((res) => res.data);

  return albums.value;
};

const getAlbum = (albumId: number) =>
  albums.value.find((album) => album.id === albumId);

const addAlbum = (payload: Omit<AlbumItem, "id">): Promise<number> =>
  new Promise((res) => {
    const lastItem = albums.value[albums.value.length - 1];
    const itemId = (lastItem?.id ?? 0) + 1;

    albums.value.push({ ...payload, id: itemId });

    res(itemId);
  });

const editAlbum = (albumId: number, payload: AlbumItem): Promise<number> =>
  new Promise((res) => {
    albums.value = albums.value.map((album) =>
      album.id === albumId ? payload : album
    );

    res(albumId);
  });

const removeAlbum = (albumId: number) => {
  albums.value = albums.value.filter((album) => album.id !== albumId);
};

export { albums, getAlbums, getAlbum, addAlbum, editAlbum, removeAlbum };
export type { AlbumItem };
