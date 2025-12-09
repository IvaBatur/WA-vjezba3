<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const pizza = ref(null)
const greska = ref(null)

async function fetchPizzaDetails() {
  try {
    const naziv = route.params.naziv
    const response = await axios.get(`http://localhost:3000/pizze/${naziv}`)
    pizza.value = response.data
    console.log('Dohvaćena pizza:', pizza.value)
  } catch (error) {
    console.error('Greška pri dohvaćanju podataka o pizzi:', error)
    greska.value = 'Pizza nije pronađena.'
  }
}

function vratiSeNaPopis() {
  router.push('/')
}

onMounted(() => {
  fetchPizzaDetails()
})
</script>

<template>
  <div class="min-h-screen p-8 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
    <div class="max-w-4xl mx-auto">
      
    
      <div v-if="greska" class="bg-red-600 text-white p-4 rounded-lg mb-4">
        {{ greska }}
      </div>

    
      <div v-else-if="!pizza" class="text-white text-center">
        Učitavanje...
      </div>

      
      <div v-else class="bg-slate-800/90 rounded-xl p-8 text-white">
        <button
          @click="vratiSeNaPopis"
          class="mb-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
        >  Natrag na popis  </button>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <img 
              :src="pizza.slika_url" 
              :alt="pizza.naziv" 
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

        
          <div>
            <h1 class="text-4xl font-bold text-orange-400 mb-4">{{ pizza.naziv }}</h1>
            
            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-2">Sastojci:</h2>
              <ul class="list-disc list-inside text-slate-300">
                <li v-for="sastojak in pizza.sastojci" :key="sastojak">
                  {{ sastojak }}
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-xl font-semibold mb-2">Cijene:</h2>
              <div class="space-y-2">
                <div class="flex justify-between bg-slate-700 p-3 rounded-lg">
                  <span class="font-medium">Mala</span>
                  <span class="text-orange-400 font-bold">€{{ pizza.cijene.mala }}</span>
                </div>
                <div class="flex justify-between bg-slate-700 p-3 rounded-lg">
                  <span class="font-medium">Srednja</span>
                  <span class="text-orange-400 font-bold">€{{ pizza.cijene.srednja }}</span>
                </div>
                <div class="flex justify-between bg-slate-700 p-3 rounded-lg">
                  <span class="font-medium">Jumbo</span>
                  <span class="text-orange-400 font-bold">€{{ pizza.cijene.jumbo }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
