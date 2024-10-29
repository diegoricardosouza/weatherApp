<template>
  <div
      v-if="preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start tracking this city.
      </p>
    </div>
</template>

<script setup>
defineProps({
  preview: {
    type: Boolean,
    required: true
  }
})
</script>
