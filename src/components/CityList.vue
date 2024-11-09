<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="gotToCityView(city)"/>
  </div>

  <p v-if="savedCities.length === 0">
    Nenhum local adicionado. Para começar a rastrear uma localização, pesquise
    no campo acima.
  </p>
</template>

<script setup>
import { getSavedCities } from '@/utils/localStorage';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const savedCities = ref([]);
const localStorageSavedCities = getSavedCities();
const openWeather = import.meta.env.VITE_API_OPENWEATHER;
const router = useRouter();

const getCities = async () => {
  if (localStorageSavedCities) {
    savedCities.value = JSON.parse(localStorageSavedCities);
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${openWeather}&units=imperial&lang=pt_br`)
    )
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data
  })
}
await getCities();

const gotToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: { lat: city.coords.lat, lng: city.coords.lng }
  })
}
</script>
