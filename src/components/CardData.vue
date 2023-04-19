<script setup name="CardData">
import { defineProps, ref } from "vue";
const props = defineProps({
  cardDetails: { type: Object },
});
const cardHeadStyle = {
  color: "#fff",
  fontWeight: "bold",
  transition: "all 1s ease-in-out",
  fontSize: "30px",
  border: "0 solid aqua",
};
const cardBodyStyle = {
  color: "#FF9900",
  fontWeight: "bold",
  fontSize: "30px",
};
</script>
<template>
  <div>
    <a-card
      class="card"
      :head-style="cardHeadStyle"
      :body-style="cardBodyStyle"
      :title="props.cardDetails.title"
    >
      {{ props.cardDetails.data }}
    </a-card>
  </div>
</template>
<style>
.ant-card.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  border-radius: 20px;
  background: linear-gradient(to right, #172336, #243a54);
  text-align: center;
  margin: 10px;
}

.ant-card-body,
.ant-card-head-title {
  padding: 0;
}
</style>
