import renderApi from '@api/render-api';

renderApi.auth('rnd_ROFUUNY0ruebkK1DOYXWROYxFM9V');
renderApi.listServices({includePreviews: 'true', limit: '20'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));