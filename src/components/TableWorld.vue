<template>
  <div>
    <div>
      <div class="label">
        <input
          class="input"
          type="text"
          name="name_country"
          v-model="searchTerm"
          :placeholder="t('home.input')"
        />
        <ExcelButton :world_data="dataSource" />
      </div>
      <a-table
        :data-source="dataSource"
        :columns="columns"
        size="middle"
        :pagination="false"
        :scroll="{ y: 340, x: true }"
        :key="locale"
      >
        <template v-slot:country_name="text">
          <flag :iso="text.record.flag" />
          <div class="country_name">
            {{ text.record.country_name }}
          </div>
        </template>
        <template v-slot:index="text">
          <router-link :to="`/details/${text.record.country_name}`">{{
            t("home.View_Details")
          }}</router-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import countries from "../countryConfig";
import { getCountryCode } from "../CountryIso/CountryToIso";
import { defineProps, ref, computed, watch } from "vue";
import ExcelButton from "./ExcelButton.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const props = defineProps({
  allCountries: {
    type: Array,
    required: true,
  },
});
const searchTerm = ref("");

const data = props.allCountries;
data.forEach((element, index) => {
  const countryCode =
    getCountryCode(element.country_name) !== null
      ? getCountryCode(element.country_name)
      : countries[element.country_name];
  element.flag = countryCode ? countryCode.toLowerCase() : "un";
  element.index = index;
});
const dataSource = computed(() => {
  return data.filter(
    (country) =>
      !searchTerm.value ||
      country.country_name
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())
  );
});
const columns = ref([
  {
    title: t("home.Country"),
    dataIndex: "country_name",
    key: "country_name",
    slots: { customRender: "country_name" },
    with: 60,
    customCell: () => {
      return {
        style: {
          display: "flex",
          flexDirection: "row",
          color: "#99121B",
        },
      };
    },
  },
  {
    title: t("home.Total_Cases"),
    dataIndex: "cases",
    width: 150,
    sorter: (a, b) =>
      parseInt(a.cases.replace(/,/g, "")) - parseInt(b.cases.replace(/,/g, "")),
    customCell: () => {
      return {
        style: {
          color: "#F8A132",
        },
      };
    },
  },
  {
    title: t("home.New_Cases"),
    dataIndex: "new_cases",
    width: 150,
    sorter: (a, b) => {
      const valA = a.new_cases === "N/A" ? "-1" : a.new_cases;
      const valB = b.new_cases === "N/A" ? "-1" : b.new_cases;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    customCell: () => {
      return {
        style: {
          color: "#F8A132",
        },
      };
    },
  },
  {
    title: t("home.Serious_Critical"),
    dataIndex: "serious_critical",
    sorter: (a, b) => {
      const valA = a.serious_critical === "N/A" ? "-1" : a.serious_critical;
      const valB = b.serious_critical === "N/A" ? "-1" : b.serious_critical;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#5FCE97",
        },
      };
    },
  },
  {
    title: t("home.Active_Cases"),
    dataIndex: "active_cases",
    sorter: (a, b) => {
      const valA = a.active_cases === "N/A" ? "-1" : a.active_cases;
      const valB = b.active_cases === "N/A" ? "-1" : b.active_cases;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#F8A132",
        },
      };
    },
  },
  {
    title: t("home.Total_Deaths"),
    dataIndex: "deaths",
    sorter: (a, b) => {
      const valA = a.deaths === "N/A" ? "-1" : a.deaths;
      const valB = b.deaths === "N/A" ? "-1" : b.deaths;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#CF3837",
        },
      };
    },
  },
  {
    title: t("home.New_Deaths"),
    dataIndex: "new_deaths",
    sorter: (a, b) => {
      const valA = a.new_deaths === "N/A" ? "-1" : a.new_deaths;
      const valB = b.new_deaths === "N/A" ? "-1" : b.new_deaths;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#CF3837",
        },
      };
    },
  },
  {
    title: t("home.Total_Recovered"),
    dataIndex: "total_recovered",
    sorter: (a, b) => {
      const valA = a.total_recovered === "N/A" ? "-1" : a.total_recovered;
      const valB = b.total_recovered === "N/A" ? "-1" : b.total_recovered;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#F8A132",
        },
      };
    },
  },
  {
    title: t("home.Total_Tests"),
    dataIndex: "total_tests",
    sorter: (a, b) => {
      const valA = a.total_tests === "N/A" ? "-1" : a.total_tests;
      const valB = b.total_tests === "N/A" ? "-1" : b.total_tests;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#5FCE97",
        },
      };
    },
  },
  {
    title: t("home.Deaths_Per_1_Milion_People"),
    dataIndex: "deaths_per_1m_population",
    sorter: (a, b) => {
      const valA =
        a.deaths_per_1m_population === "N/A"
          ? "-1"
          : a.deaths_per_1m_population;
      const valB =
        b.deaths_per_1m_population === "N/A"
          ? "-1"
          : b.deaths_per_1m_population;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#CF3837",
        },
      };
    },
  },
  {
    title: t("home.Tests_Per_1_Milion_People"),
    dataIndex: "tests_per_1m_population",
    sorter: (a, b) => {
      const valA =
        a.tests_per_1m_population === "N/A" ? "-1" : a.tests_per_1m_population;
      const valB =
        b.tests_per_1m_population === "N/A" ? "-1" : b.tests_per_1m_population;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#5FCE97",
        },
      };
    },
  },
  {
    title: t("home.Cases_Per_1_Milion_People"),
    dataIndex: "total_cases_per_1m_population",
    sorter: (a, b) => {
      const valA =
        a.total_cases_per_1m_population === "N/A"
          ? "-1"
          : a.total_cases_per_1m_population;
      const valB =
        b.total_cases_per_1m_population === "N/A"
          ? "-1"
          : b.total_cases_per_1m_population;
      return (
        parseInt(valA.replace(/,/g, "")) - parseInt(valB.replace(/,/g, ""))
      );
    },
    width: 150,
    customCell: () => {
      return {
        style: {
          color: "#F8A132",
        },
      };
    },
  },
  {
    title: t("home.Action"),
    width: 150,
    dataIndex: "index",
    slots: { customRender: "index" },
    customCell: () => {
      return {
        style: {
          color: "#88BFB0",
        },
      };
    },
  },
]);
</script>
<style>
.ant-table-placeholder {
  background-color: #00204a !important;
}
.ant-table-thead > tr > th {
  background: #1a1a2e !important;
  color: rgb(247, 248, 248) !important;
  padding: 0 0 0 10px !important;
  font-weight: bold !important;
  border-radius: 0 !important;
}

.ant-table-header {
  background: #1a1a2e !important;
}
.ant-table-thead > tr > th:hover {
  background-color: #083358 !important;
}
.ant-table tbody tr:nth-child(even) {
  background-color: #083358; /* Đặt màu nền cho hàng chẵn */
  padding: 0 !important;
}

.ant-table tbody tr:nth-child(odd) {
  background-color: #00204a; /* Đặt màu nền cho hàng lẻ */
  padding: 0 !important;
}
.ant-table-body {
  max-height: 500px;
  overflow-y: auto;
  line-height: 1 !important;
  font-weight: bold;
}
.world_data {
  font-size: 30px;
  color: aliceblue;
  padding: 0 10px;
}
.live_updata {
  font-size: 15px;
  color: aliceblue;
}
.label {
  position: relative;
  display: flex;
  align-items: baseline;
  background: #1a1a2e;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
}

input::placeholder {
  color: rgb(141, 137, 137);
  opacity: 1; /* Độ mờ của placeholder */
  text-align: center;
}
input {
  background-color: #074f80;
  color: rgb(141, 137, 137);
  font-weight: bold;
  position: absolute;
  align-items: baseline;
  right: 16px;
  top: 8px;
  border-radius: 6px;
  border: 0;
  padding: 6px;
  transition: transform ease 1s;
}
input:hover {
  transform: scale(1.05);
  background-color: #00204a;
}
.ant-table-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.ant-table-body::-webkit-scrollbar-track {
  background-color: #1a1a2e;
}

.ant-table-body::-webkit-scrollbar-thumb {
  background-color: #064670;
  border-radius: 20px;
  border: 3px solid #064670;
}

.ant-table-body::-webkit-scrollbar-thumb:hover {
  background-color: #255590;
}
.ant-table-wrapper {
  overflow-x: hidden !important;
}
router-link {
  padding: 5px;
  border: 2px solid #083358;
  border-radius: 3px;
  display: inline-block;
  transition: transform 0.2s ease-in-out;
  background-color: aqua !important;
}
router-link:hover {
  transform: scale(1.1);
}
.export_button {
  background-color: #074f80;
  padding: 2px;
  margin-left: 20px;
  color: #838588;
  transition: transform ease 15s;
  font-weight: bold;
}
.export_button:hover {
  background-color: #00204a;
  transform: scale(1.05);
}
span {
  padding-left: 5px;
}

.country_name {
  margin-left: 4px;
  margin-top: 2px;
}
</style>
