<template>
  <div
      v-if="preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        Você está visualizando esta cidade no momento, clique no ícone "+" para começar a rastrear esta cidade.
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
