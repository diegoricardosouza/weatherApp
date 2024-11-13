<template>
  <div class="flex flex-col flex-1 items-center">
    <Banner :preview="Boolean(route.query.preview)" />

    <WeatherOverview :city="route.params.city" :weather-data="weatherData"/>

    <hr class="border-white border-opacity-10 border w-full" />

    <HourlyWeather :weather-data="weatherData" />

    <hr class="border-white border-opacity-10 border w-full" />

    <WeeklyWeather :weather-data="weatherData" />

    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      Remover cidade
    </div>
  </div>
</template>

<script setup>
import { getSavedCities, setSaveCities } from '@/utils/localStorage';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Banner from './Banner.vue';
import HourlyWeather from './HourlyWeather.vue';
import WeatherOverview from './WeatherOverview.vue';
import WeeklyWeather from './WeeklyWeather.vue';

const route = useRoute();
const openWeather = import.meta.env.VITE_API_OPENWEATHER

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openWeather}&units=imperial&lang=pt_br`
    )

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
}

const weatherData = await getWeatherData();


const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(getSavedCities());
  const updateCities = cities.filter(
    city => city.id !== route.query.id
  )
  setSaveCities(updateCities);
  router.push({
    name: 'home',
  })
}
</script>
