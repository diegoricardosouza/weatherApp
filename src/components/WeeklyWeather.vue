<template>
  <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Previsão para 7 dias</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1 capitalize">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "pt-BR",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Máx: {{ fahrenheitToCelsius(day.temp.max) }}&deg;C</p> -
            <p>Min: {{ fahrenheitToCelsius(day.temp.min) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { fahrenheitToCelsius } from '@/utils/converter';

defineProps({
  weatherData: {
    type: Object,
    required: true
  }
})
</script>
