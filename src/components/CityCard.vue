<template>
  <div class="flex py-6 px-6 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ fahrenheitToCelsius(city.weather.main.temp) }}&deg;C
      </p>

      <div class="flex gap-2">
        <span class="text-xs">
          Min: {{ fahrenheitToCelsius(city.weather.main.temp_min) }}&deg;
        </span>
        <span class="text-xs">
          Máx: {{ fahrenheitToCelsius(city.weather.main.temp_max) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fahrenheitToCelsius } from '@/utils/converter';



defineProps({
  city: {
    type: Object,
    default: () => {}
  }
})
</script>
