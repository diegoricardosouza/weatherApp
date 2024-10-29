<template>
  <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ city }}</h1>
      <p class="text-sm mb-12 uppercase">
        {{ converterDateFull(weatherData.currentTime) }}
        {{ converterHours(weatherData.currentTime) }}
      </p>
      <p class="text-8xl mb-8">
        {{ fahrenheitToCelsius(weatherData.current.temp) }}&degC
      </p>

      <p>
        Sensação térmica
        {{ fahrenheitToCelsius(weatherData.current.feels_like) }}&degC
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt="Ícone do clima"
      />
    </div>
</template>

<script setup>
import { converterDateFull, converterHours, fahrenheitToCelsius } from '@/utils/converter';

defineProps({
  weatherData: {
    type: Object,
    required: true
  },
  city : {
    type: String,
    default: ""
  }
})
</script>
