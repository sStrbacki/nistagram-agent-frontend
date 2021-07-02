<template>
  <b-container>
    <input type="file" ref="image" accept="image/*" @change="uploadImage"/>
  </b-container>
</template>

<script>
import {createImageFormData} from "@/services/fileService";
import axios from "axios";
import api from "@/api";
import {errorMessage} from "@/helpers/notfications";

export default {
  name: "ImageInput",
  data() {
    return {
      // Local server throws an error if image is bigger than this
      maxImageSize: 1048576
    }
  },
  methods: {
    uploadImage() {
      const file = this.$refs.image.files[0];

      if (this.isFileTooBig(file)) {
        errorMessage('Image too big. Must be less than ' + this.maxImageSize);
        return;
      }

      const formData = createImageFormData(file);

      axios.post(
        api.images.root,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
      })
      .then(response => {
        const imageUrl = api.images.content + '/' + response.data;
        this.$emit('imageUrl', imageUrl);
      })
      .catch(() => errorMessage('Error while uploading the image.'))
    },
    isFileTooBig(file) {
      return file.size > this.maxImageSize;
    }
  }
}
</script>

<style scoped>

</style>
