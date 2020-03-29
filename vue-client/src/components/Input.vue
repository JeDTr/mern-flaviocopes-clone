<template>
  <div>
    <input v-model="vField.$model" />
    <!-- <template v-if="vField.$model.$error"> -->
    <span v-for="param in Object.keys(vField.$params)" :key="param">{{param}}</span>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    vField: Object
  }
};
</script>

<style >
input {
  height: 40px;
  display: block;
  width: 100%;
  margin: 10px 0;
  padding-left: 10px;
  box-sizing: border-box;
  padding-right: 10px;
  border-style: solid;
  border-width: 1px;
}
</style>