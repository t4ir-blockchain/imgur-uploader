// src/store/modules/images.js
import axios from 'axios';
import router from '@/router';

const state = {
  images: [],
};

const getters = {
  allImages: state => state.images,
};

const mutations = {
  setImages: (state, images) => state.images = images,
};

const actions = {
  // async: 이 함수는 비동기 동작을 포함하고 있음!
  async fetchImages ({ rootState, commit }) {
    const fullUrl = 'https://api.imgur.com/3/account/me/images';
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      }
    };

    // 1 & 2는 같은 코드입니다.
    // 1
    try {
      // await: 바로 여기가 비동기 파트다. 고로 기다려!
      const res = await axios.get(fullUrl, config);
      commit('setImages', res.data.data);
    } catch (err) {
      console.error(err.response)
    }

    // 2
    // axios.get(fullUrl, config)
    //   .then(res => commit('setImages', res.data.data))
    //   .catch(err => console.error(err.response))
  },
  uploadImages({ rootState }, event) {
    const fullUrl = 'https://api.imgur.com/3/image';
    const images = event.target.files;
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      }
    };

    const promises = [];

    images.forEach(image => {
      const formData = new FormData();
      formData.append('image', image)
      const promise = axios.post(fullUrl, formData, config)
      promises.push(promise)
    })
    
    Promise.all(promises)
      .then(() => router.push({ name: 'ImageList' }))
      .catch(err => console.error(err))
  },
};

export default {
  state, getters, mutations, actions
}