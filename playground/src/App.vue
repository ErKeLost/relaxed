<template>
  <RelaxedLayout fixed-sider :siderVisible="false">
    <template #header>
      <div class="flex-center h-full bg-#bfd">Header</div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-#6DCB6C">Tab</div>
    </template>
    <!-- <template #sider>
      <div class="h-full bg-#6CCBC8">
        <div class="flex-center h-56px">Sider</div>
      </div>
    </template> -->
    <template #footer>
      <div class="flex-center h-full bg-#bfa">Footer</div>
    </template>
    <div class="text-center bg-#D061D8">
      <div v-for="i in 50" :key="i" class="text-center">{{ i }}</div>
    </div>
  </RelaxedLayout>
</template>

<script setup lang="ts"></script>
