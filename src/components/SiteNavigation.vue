<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{name: 'home'}">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Clima Local</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModal
        :modal-active="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">Sobre:</h1>
          <p class="mb-4">
            O Clima Local permite que você acompanhe a situação atual e
            clima futuro das cidades de sua escolha.
          </p>
          <h2 class="text-2xl">Como funciona:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Procure sua cidade digitando o nome no campo
              barra de pesquisa.
            </li>
            <li>
              Selecione uma cidade nos resultados, isso levará
              você para o clima atual para sua seleção.
            </li>
            <li>
              Acompanhe a cidade clicando no ícone "+" no
              canto superior direito. Isso salvará a cidade para visualização no
              futuro na página inicial.
            </li>
          </ol>

          <h2 class="text-2xl">Removendo uma cidade</h2>
          <p>
            Se você não deseja mais rastrear uma cidade, basta selecionar
            a cidade na página inicial. Na parte inferior da
            página, haverá uma opção para excluir a cidade.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { getSavedCities, setSaveCities } from '@/utils/localStorage';
import { uid } from 'uid';
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';

const savedCities = ref([]);
const localStorageSavedCities = getSavedCities();
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorageSavedCities) {
    savedCities.value = JSON.parse(localStorageSavedCities);
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    }
  }

  savedCities.value.push(locationObj);
  setSaveCities(savedCities.value)

  let query = Object.assign({}, route.query);
  delete query.preview;
  // query.id = locationObj.id;
  router.replace({ query });
}

const modalActive = ref(null);
function toggleModal() {
  modalActive.value = !modalActive.value;
}
</script>
