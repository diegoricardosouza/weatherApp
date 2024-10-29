<template>
  <div class="flex flex-col flex-1 items-center">
    <Banner :preview="Boolean(route.query.preview)" />

    <WeatherOverview :city="route.params.city" :weather-data="weatherData"/>

    <hr class="border-white border-opacity-10 border w-full" />

    <HourlyWeather :weather-data="weatherData" />

    <hr class="border-white border-opacity-10 border w-full" />

    <WeeklyWeather :weather-data="weatherData" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import Banner from './Banner.vue';
import HourlyWeather from './HourlyWeather.vue';
import WeatherOverview from './WeatherOverview.vue';
import WeeklyWeather from './WeeklyWeather.vue';

const route = useRoute();
const openWeather = import.meta.env.VITE_API_OPENWEATHER

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openWeather}&units=imperial`
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

</script>
