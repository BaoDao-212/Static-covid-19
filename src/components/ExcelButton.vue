<template>
  <div>
    <a-button class="export_button" @click="exportToExcel">
      {{ t("home.button_export") }}
    </a-button>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useI18n } from "vue-i18n";
import countries from "../countryConfig";
import { useWorldStore } from "../stores/store";
import { getCountryCode } from "../CountryIso/CountryToIso";
const worldStore = useWorldStore();
const dateUpdate = computed(
  () => worldStore.$state.dataCorona.world_total.statistic_taken_at
);
const props = defineProps({
  world_data: {
    type: Array,
    required: true,
  },
});
const { t } = useI18n();
const exportToExcel = async () => {
  const data = props.world_data;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Report");
  const cell = worksheet.getCell("E1");
  cell.value = t("home.title");
  cell.font = { bold: true, size: 18 };
  const headers = [
    t("home.Number"),
    t("home.Flag"),
    t("home.Country"),
    t("home.Total_Cases"),
    t("home.Total_Recovered"),
    t("home.Serious_Critical"),
    t("home.Total_Tests"),
    t("home.Active_Cases"),
    t("home.New_Deaths"),
    t("home.Deaths_Per_1_Milion_People"),
    t("home.Tests_Per_1_Milion_People"),
  ];
  const headerRow = worksheet.addRow(headers);
  for (const row of data) {
    const countryCode =
      getCountryCode(row.country_name) !== null
        ? getCountryCode(row.country_name)
        : countries[row.country_name];
    const code = countryCode ? countryCode.toLowerCase() : "un";
    const unSvg = await import(
      `./../../node_modules/flag-icons/flags/4x3/${code}.svg`
    );
    const response = await fetch(unSvg.default);
    const imageBuffer = await response.arrayBuffer();

    const imageId = await workbook.addImage({
      buffer: imageBuffer,
      extension: "svg",
    });
    worksheet.addImage(imageId, {
      tl: { col: 1, row: imageId + 2 },
      br: { col: 2, row: imageId + 3 },
      editAs: "oneCell",
    });
    worksheet.addRow([
      row.index,
      "",
      row.country_name,
      parseInt(row.cases.replace(/,/g, "")),
      parseInt(row.deaths.replace(/,/g, "")),
      parseInt(row.new_cases.replace(/,/g, "")),
      parseInt(row.total_recovered.replace(/,/g, "")),
      parseInt(row.serious_critical.replace(/,/g, "")),
      parseInt(row.active_cases.replace(/,/g, "")),
      parseInt(row.total_tests.replace(/,/g, "")),
      parseInt(row.new_deaths.replace(/,/g, "")),
      parseInt(row.deaths_per_1m_population.replace(/,/g, "")),
      parseInt(row.tests_per_1m_population.replace(/,/g, "")),
      parseInt(row.total_cases_per_1m_population.replace(/,/g, "")),
    ]);
  }

  worksheet.columns.forEach((column, index) => {
    if (index != 4 && index != 1) {
      let maxLength = 0;
      column.eachCell((cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 0;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    } else if (index == 4) {
      column.width = 10;
    } else {
      column.width = 4;
    }
  });
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const date = dateUpdate.value.split(" ")[0].split("-").join("_");
  saveAs(new Blob([buffer]), `report_covid19_${date}.xlsx`);
};
</script>
