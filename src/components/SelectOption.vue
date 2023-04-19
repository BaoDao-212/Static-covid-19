<template>
  <a-space direction="vertical" style="display: flex; width: 100%">
    <a-select
      v-model:value="value"
      mode="multiple"
      class="select"
      placeholder="Select one option"
      :options="options"
    >
      <template class="select" #option="{ value: val, label, icon }">
        <span role="img" :aria-label="val">{{ icon }}</span>
        &nbsp;&nbsp;{{ label }}
      </template>
      <template
        class="select"
        #tagRender="{ value: val, label, closable, onClose, option }"
      >
        <a-tag
          :closable="closable"
          class="select"
          style="margin-right: 3px"
          @close="onClose"
        >
          {{ label }}&nbsp;&nbsp;
          <span role="img" :aria-label="val">{{ option.icon }}</span>
        </a-tag>
      </template>
    </a-select>
  </a-space>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
const value = ref(["dailyconfirmed"]);
const options = ref([
  {
    value: "dailyconfirmed",
    label: "Daily Confirmed (Xác nhận hằng ngày)",
    icon: "DC",
  },
  {
    value: "dailydeceased",
    label: "Daily Deceased (Ca chết hằng ngày)",
    icon: "DD",
  },
  {
    value: "dailyrecovered",
    label: "Daily Recovered (Ca hồi phục hằng ngày)",
    icon: "DR",
  },
]);
const emits = defineEmits(["option-updated"]);
watch(value, (val) => {
  console.log(`selected:`, val);
  emits("option-updated", val);
});
</script>
<style>
.select {
  width: 80%;
  background-color: #2080a0 !important;
}
</style>
