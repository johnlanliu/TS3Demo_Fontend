<template>
  <el-dialog :visible.sync="isOpen" title="Detail Search" :center="true" top="12vh">
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="200px" size="mini">
          <el-form-item label="Device Ids" prop="deviceIds">
            <el-input v-model="form.devices" type="textarea" rows="20" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
            <el-button @click="clearValidate('form');">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    name: 'DeviceDetailSearch',

    props: {
      form: [Object]
    },

    data: function() {
      return {
        loading: false,
        isOpen: false,
      };
    },

    methods: {
      showDialog() {
        this.isOpen = true;
      },

      onSubmit(formName) {
        this.isOpen = false;
        this.$emit('reload-table');
      },

      clearValidate(formName) {
        this.isOpen = false;
        this.$refs[formName].clearValidate();
        // 移除校验结果
      },
    }
  };
</script>

<style scoped>

</style>
