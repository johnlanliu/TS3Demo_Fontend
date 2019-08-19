<template>
  <el-dialog
    :title="'Confirm'"
    :center="true"
    top="15vh"
    :visible.sync="visible"
    :append-to-body="append"
    @close="resetFields"
  >
    <div class="confirmationPage">
      <el-form ref="form" :model="form" style="margin-left: 100px">
        <el-form-item label="Item: " :item="item">{{ item }}</el-form-item>
        <el-form-item label="Price: " :price="price">{{ price }}</el-form-item>
        <el-form-item label="QTY: " :QTY="QTY">{{ QTY }}</el-form-item>
        <el-form-item label="Service Fee: " :serviceFee="serviceFee">{{ serviceFee }}</el-form-item>
        <el-form-item label="Tax: " :tax="tax">{{ tax }}</el-form-item>
        <el-form-item>
          <el-row style="float: right; margin-right: 100px">
            <el-button type="primary">No</el-button>
            <el-button type="primary">Yes</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ConfirmationForm',
  components: {},
  data: function() {
    return {
      loading: false,
      append: true,
      item: 'VT1611R30',
      price: '$250',
      QTY: '10',
      serviceFee: '$7',
      tax: 'Yes'
    };
  },
  props: {
    value: Boolean,
    form: [Object]
  },

  methods: {
    resetFields() {
      this.$refs.form.resetFields();
    }
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style scoped>
</style>
