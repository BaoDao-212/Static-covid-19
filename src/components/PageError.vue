<template>
  <a-result
    status="warning"
    title="There are some problems with your operation."
  >
    <template #extra>
      <a-button key="console" type="primary">
        <router-link to="/India">{{ t("links.india") }}</router-link></a-button
      >
    </template>
  </a-result>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
