<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    name: string
}>()

const counter = ref(0)

const message = computed(() => {
    return `Hello World! We're using TypeScript. ` +
        `I am ${props.name} and you have clicked me ${counter.value} time(s).`
})

function didClick() {
    counter.value++
    alert(message.value)
}
</script>

<template>
  <button @click="didClick">Click me!</button>
</template>

<style scoped></style>
