<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full  bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      >

      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-2 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>

        <p v-if="!serverError && mapboxSearchResults.length === 0">No results match your query, try a different term.</p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 px-4 cursor-pointer transition-all hover:bg-black/10"
            @click="previewCity(searchResult)"
          >
            <strong>{{ searchResult.properties.name_preferred }}</strong>
            <small class="block">{{ searchResult.properties.place_formatted }}</small>
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const mapboxAPIKey = import.meta.env.VITE_API_MAPBOX
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);
const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.properties.full_address.split(",");
  router.push({
    name: 'cityView',
    params: { state: state.trim(), city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if(searchQuery.value !== '') {
      try {
        const result = await axios.get(`
          https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=${mapboxAPIKey}&types=place
        `)
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
}
</script>
