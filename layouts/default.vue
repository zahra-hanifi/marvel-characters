<script setup>
</script>

<template>
  <div class="linear-bg">
    <div class="p-3 max-w-[1200px] mx-auto">
      <nuxt-img src="/images/logo.png" class="max-w-[120px]" />
    </div>

    <slot />
  </div>
</template>

<style>
.linear-bg {
  background: linear-gradient(to right, #2C2E30, #0e0e0e);
}
</style>