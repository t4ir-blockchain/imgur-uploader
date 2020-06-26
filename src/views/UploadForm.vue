<template>
  <div class="dropper">
    <input 
      @change="uploadImages" 
      type="file"
      multiple
      accept="image/*"
    >
    <span>Drag images here</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UploadForm',
  methods: mapActions(['uploadImages'])
}
</script>

<style>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dropper:hover {
  background-color: #999;
}
input {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;  
  cursor: pointer;
}
</style>