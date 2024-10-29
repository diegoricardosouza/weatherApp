<template>
  <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Tempo de hora em hora</h2>
        <div class="flex gap-10 overflow-x-scroll pb-5">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col items-center"
          >
            <p class="whitespace-nowrap text-xs">
              {{ converterHours(hourData.currentTime) }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ fahrenheitToCelsius(hourData.temp) }}&deg;C
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { converterHours, fahrenheitToCelsius } from '@/utils/converter';

defineProps({
  weatherData: {
    type: Object,
    required: true
  }
})
</script>
