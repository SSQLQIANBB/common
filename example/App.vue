<template>
  <div class="app">
    <h1>Personal Utils Example</h1>

    <div class="demo-section">
      <h2>HTTP Utils Demo</h2>
      <button
        @click="testHttp"
        class="demo-button"
      >
        Test HTTP Function
      </button>
      <div
        v-if="httpResult"
        class="result"
      >
        <h3>Result:</h3>
        <pre>{{ JSON.stringify(httpResult, null, 2) }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>Library Info</h2>
      <p>
        This example demonstrates how to use the personal-utils library in a Vue
        3 application.
      </p>
      <p>
        The library provides utility functions that can be imported and used in
        your projects.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { http } from 'personal-utils';

  const httpResult = ref<any>(null);

  const testHttp = () => {
    try {
      // const result = http();
      // httpResult.value = result;
      // console.log('HTTP function result:', result);
    } catch (error) {
      console.error('Error calling http function:', error);
      // httpResult.value = { error: error.message };
    }
  };
</script>

<style scoped>
  .app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
  }

  .demo-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;
  }

  h2 {
    color: #495057;
    margin-top: 0;
  }

  .demo-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .demo-button:hover {
    background: #0056b3;
  }

  .result {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 15px;
    margin-top: 15px;
  }

  .result h3 {
    margin-top: 0;
    color: #495057;
  }

  pre {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0;
  }
</style>
