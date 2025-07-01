<template>
  <div class="preloader-view">
    <svg class="spinner" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#117DC1" stop-opacity="1" />
          <stop offset="77.27%" stop-color="#117DC1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#117DC1" stop-opacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="url(#gradient)"
        stroke-width="4"
        stroke-dasharray="30, 100"
        stroke-linecap="round"
        transform="rotate(-88.9 24 24)"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PreloaderView'
}
</script>

