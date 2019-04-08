<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="650px"
  center
  @close="resetFields">
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="rule-form">
    <el-form-item label="Name:" prop="dictName">
      <el-input v-model="form.dictName"></el-input>
    </el-form-item>
    <el-form-item label="Value:" prop="dictValue">
      <el-input v-model="form.dictValue"></el-input>
    </el-form-item>
    <el-form-item label="Type:" prop="type">
      <el-input v-model="form.type"></el-input>
    </el-form-item>
    <el-form-item label="Remark:" prop="remarks">
      <el-input v-model="form.remarks"></el-input>
    </el-form-item>
    <el-form-item label="Description:" prop="description">
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="4">
      </el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleSave">Save</el-button>
    <el-button @click="visible = false">Cancel</el-button>
  </span>
</el-dialog>
</template>

<script>
import { addDict, editDict } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil';
export default {
  mixins: [exceptionUtil],

  props: {
    value: {
      type: Boolean,
      default: false
    },
    isAdd: Boolean,
    form: Object
  },

  data: function() {
    return {
      dictForm: {
        name: '',
        value: '',
        type: ''
      },
      rules: {
        dictName: [
          { required: true, message: 'please enter name' }
        ],
        dictValue: [
          { required: true, message: 'please enter value' }
        ],
        type: [
          { required: true, message: 'please enter type' }
        ],
        remarks: [
          { required: true, message: 'please enter remark' }
        ]
      }
    };
  },

  computed: {
    title() {
      return this.isAdd ? 'Add Role' : 'Edit Role';
    },

    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },

  methods: {
    // save
    handleSave() {
      this.isAdd ? this.fetchAddDict() : this.fetchEditDict();
    },

    // add
    async fetchAddDict() {
      const res = await addDict({}, this.form);
      if(!res || res.errorCode) {
        this.exceptionHandle(res.errorCode);
        return;
      }
      this.$message.success('Add dictionary successful!');
      this.$emit('reload-table');
      this.visible = false;
    },

    // edit
    async fetchEditDict() {
      let param = JSON.parse(JSON.stringify(this.form));
      delete param.flag;
      delete param.createTime;
      const res = await editDict({}, param);
      if(!res || res.errorCode) {
        this.exceptionHandle(res.errorCode);
        return;
      }
      this.$message.success('Edit dictionary successful!');
      this.$emit('reload-table');
      this.visible = false;
    },

    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.rule-form {
  margin: 0 15px;
}

.el-input, .el-textarea {
  width: 440px;
}
</style>
