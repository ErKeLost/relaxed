<template>
  <adny-layout
    :mode="mode"
    :fixed-header-and-tab="fixedHeaderAndTab"
    :sider-collapse="siderCollapse"
    :fixedSider="fixedSider"
    :holdHeaderFixedSider="holdHeaderFixedSider"
    :siderVisible="showSider"
    :fixedFooter="fixedFooter"
    :footerVisible="showFooter"
    :tabMoveable="tabMoveable"
  >
    <template #header>
      <div text-red class="flex-center h-full bg-[#abf]">Header</div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-[#fba]">Tab</div>
    </template>
    <template #sider>
      <div class="bg-[#fab] whitespace-nowrap" h-full>
        <div class="flex-center h-56px">Sider</div>
        <div>
          <h4>layout mode:</h4>
          <div v-for="item in modeList" :key="item">
            <span class="pr-8px">{{ item }}</span>
            <input
              type="radio"
              name="mode"
              :value="item"
              :checked="item === mode"
              class="cursor-pointer"
              @change="setMode(item)"
            />
          </div>
        </div>
        <div class="pt-24px">
          <span class="pr-8px">fixedHeaderAndTab</span>
          <input
            type="checkbox"
            :checked="fixedHeaderAndTab"
            @change="setFixedHeaderAndTab"
          />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">tabMoveable</span>
          <input
            type="checkbox"
            :checked="tabMoveable"
            @change="setTabMoveable"
          />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">不占据header高度fixed</span>
          <input
            type="checkbox"
            :checked="holdHeaderFixedSider"
            @change="setHoldHeaderFixedSider"
          />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">FixedSider</span>
          <input
            type="checkbox"
            :checked="fixedSider"
            @change="setFixedSider"
          />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">展示sider</span>
          <input type="checkbox" :checked="showSider" @change="setShowSider" />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">展示footer</span>
          <input type="checkbox" :checked="showFooter" @change="setShowFooter" />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">固定footer</span>
          <input
            type="checkbox"
            :checked="fixedFooter"
            @change="setFixedFooter"
          />
        </div>
        <div class="pt-24px">
          <span class="pr-8px">siderCollapse</span>
          <input
            type="checkbox"
            :checked="siderCollapse"
            @change="setSiderCollapse"
          />
        </div>
        <!-- <div v-for="i in 100" :key="i" class="text-center">
          {{ i }}
        </div> -->
      </div>
    </template>
    <template #footer>
      <div class="flex-center h-full bg-[#bfa]">Footer</div>
    </template>
    <div text-center>
      <img
        src="
    https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-dark.svg"
      />
    </div>
    <div v-for="i in 20" :key="i" class="text-center">{{ i }}</div>
  </adny-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import adnyLayout from '../index.vue'

type Mode = 'vertical' | 'horizontal'
const mode = ref<Mode>('vertical')
const modeList: Mode[] = ['vertical', 'horizontal']
function setMode(value: Mode) {
  mode.value = value
}
const showSider = ref(true)
const showFooter = ref(true)
function setShowSider() {
  showSider.value = !showSider.value
}
function setShowFooter() {
  showFooter.value = !showFooter.value
}
const fixedFooter = ref(false)
function setFixedFooter() {
  fixedFooter.value = !fixedFooter.value
}
const fixedHeaderAndTab = ref(true)
const tabMoveable = ref(true)
function setTabMoveable() {
  tabMoveable.value = !tabMoveable.value
}
function setFixedHeaderAndTab() {
  fixedHeaderAndTab.value = !fixedHeaderAndTab.value
}
const holdHeaderFixedSider = ref(false)
function setHoldHeaderFixedSider() {
  holdHeaderFixedSider.value = !holdHeaderFixedSider.value
}
const fixedSider = ref(true)
function setFixedSider() {
  fixedSider.value = !fixedSider.value
}
const siderCollapse = ref(false)
function setSiderCollapse() {
  siderCollapse.value = !siderCollapse.value
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
