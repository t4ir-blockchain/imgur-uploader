<template>
  <div class="image-container">
    <img 
      v-for="image in allImages"
      :key="image.id"
      :src="image.link" 
      :alt="image.name"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageList',
  // computed: mapState(['images']), + import 필요
  computed: mapGetters(['allImages']),
  methods: mapActions(['fetchImages']),
  created() {
    this.fetchImages();
  },
}
</script>

<style>
.image-container {
  column-count: 3;
  column-gap: 0;
}
img {
  max-width: 100%;
  padding: 5px;
}
</style>