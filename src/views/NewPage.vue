<template>
  <div class="new-page">
    <div class="page-header mb-4">
      <h1 class="page-title">New Page</h1>
      <p class="page-subtitle">This is a new page component</p>
    </div>

    <div class="page-content">
      <div class="content-section">
        <h3>Welcome</h3>
        <p>This is a template for your new Vue page component.</p>
        
        <div class="example-section mt-4">
          <h4>Interactive Example</h4>
          <p>Counter: {{ count }}</p>
          <button @click="increment" class="btn btn-primary">
            Increment
          </button>
          <button @click="decrement" class="btn btn-secondary ml-2">
            Decrement
          </button>
          <button @click="reset" class="btn btn-outline ml-2">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const count = ref(0)

// Methods
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}
</script>

<style lang="scss" scoped>
.new-page {
  padding: 2rem;
  
  .page-header {
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 1rem;
    
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .page-subtitle {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }
  }
  
  .page-content {
    margin-top: 2rem;
    
    .content-section {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #333;
      }
      
      h4 {
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
        color: #444;
      }
      
      p {
        color: #555;
        line-height: 1.6;
