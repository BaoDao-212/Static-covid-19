<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item class="logo">
          <span class="label_vaccovid">VACCOVID</span>
          <span class="label_live">.LIVE</span>
          <div class="circle"></div>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/">{{ t("links.home") }}</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/India/Timeline">{{
            t("links.timeline")
          }}</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/india">{{ t("links.india") }}</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/world">{{ t("links.world") }}</router-link>
        </a-menu-item>
        <a-menu-item class="menu-chang-locale">
          <a-dropdown style="display: flex; justify-content: center">
            <template #overlay>
              <a-menu>
                <a-menu-item
                  key="en"
                  @click="changeLocale('en')"
                  class="buttonChangeLocale"
                  ><span class="fi fi-gb fib"
                /></a-menu-item>
                <a-menu-item
                  key="vn"
                  @click="changeLocale('vn')"
                  class="buttonChangeLocale"
                  ><span class="fi fi-vn fib"
                /></a-menu-item>
              </a-menu>
            </template>
            <i v-if="locale == 'en'" class="fi fi-gb fib" />
            <i v-else-if="locale == 'vn'" class="fi fi-vn fib" />
            <a-icon type="down" />
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script setup>
import "../../node_modules/flag-icons/css/flag-icons.min.css";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const changeLocale = (language) => {
  locale.value = language;
  console.log(locale.value);
};
</script>

<style>
.ant-dropdown-menu {
  padding: 0 !important;
  margin: 12px -4px 0px 0px !important;
}
.ant-dropdown-menu-item {
  padding: 0 13px 0 13px !important;
  margin: 0 27px !important;
}
#components-layout-demo-fixed .logo {
  width: 100%;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #645a5a;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.buttonChangeLocale {
  background-color: #182438 !important;
  height: 50px;
  margin: 0 !important;
  width: fit-content;
}
.fib {
  width: 60px;
  height: 24px;
  padding-left: 0;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item.menu-chang-locale,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu.menu-chang-locale {
  position: fixed;
  right: 0px;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
  background-color: #3c4d6b !important;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected {
  background-color: #182438 !important;
}

.logo {
  max-width: 100%;
  display: flex;
  display: row;
  height: auto;
  padding: 0 20px;
}
.label_vaccovid {
  color: aqua;
}
.label_live {
  color: #c90a0a;
}
</style>
