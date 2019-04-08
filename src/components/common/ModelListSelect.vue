<template>
  <el-select
    :placeholder="placeholder"
    v-model="modelId"
    :clearable="clearable"
    :disabled="disabled"
  >
    <el-option
      v-for="item in modelList"
      :key="item.modelId"
      :label="item.modelName"
      :value="item.modelId"
    ></el-option>
  </el-select>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      modelId: null
    };
  },
  props: {
    placeholder: { type: String, default: 'Please select the model' },
    value: { type: [String, Number] },
    clearable: { type: Boolean },
    disabled: { type: Boolean }
  },
  computed: {
    ...mapState(['modelList'])
  },
  created() {
    this.modelId = this.value;
  },
  mounted() {},
  components: {},
  methods: {},
  watch: {
    value(val, oldValue) {
      this.modelId = val;
    },
    // 判断下拉框的值是否有改变
    modelId(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    }
  }
};
</script>

<style>
</style>
