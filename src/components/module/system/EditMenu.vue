<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  center
  width="600px"
  top="5vh"
  @close="resetFields">
  <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="rule-form">
    <el-form-item label="Parent" prop="parentMenu" v-if="form.type===1 || editType!=0">
      <el-input v-model="form.parentName" disabled></el-input>
    </el-form-item>
    <el-form-item label="Type" prop="type">
      <el-radio-group v-model="form.type" :disabled="(editType===2&&form.type===0)">
        <el-radio :label="0" :disabled="editType!==0">Directory</el-radio>
        <el-radio :label="1" :disabled="editType===0">Menu</el-radio>
        <el-radio :label="2" :disabled="editType===0">Button</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Name" prop="menuName">
      <el-input v-model="form.menuName"></el-input>
    </el-form-item>
    <el-form-item v-if="form.type===0||form.type===1" label="Title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item v-if="form.type===0||form.type===1" label="Component">
      <el-input v-model="form.component"></el-input>
    </el-form-item>
    <el-form-item v-if="form.type===0||form.type===1" label="Icon" prop="icon">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item v-if="form.type===0||form.type===1" label="Url" prop="url">
      <el-input v-model.trim="form.url"></el-input>
    </el-form-item>
    <el-form-item v-if="form.type===2" label="Perms" prop="perms">
      <el-input v-model.trim="form.perms"></el-input>
    </el-form-item>
    <el-form-item label="Weight" prop="orderNum">
      <el-input-number v-model="form.orderNum" :min="0" :max="1000"></el-input-number>
    </el-form-item>
    <el-form-item label="Remark" prop="remark">
      <el-input v-model="form.remark" type="textarea" rows="3"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" :loading="loading">Save</el-button>
      <el-button @click="clearValidate('form');">Cancel</el-button>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
</template>

<script>
import { addMenu, editMenu } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';

export default {
  name: 'EditMenu',
  mixins: [exceptionUtil],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 0-add directory  1-add-sub  2-edit
    editType: Number,
    form: Object
  },

  data: function() {
    return {
      loading: false,
      rules: {
        type: [
          { required: true, message: 'please enter menu type' }
        ],
        menuName: [
          { required: true, message: 'please enter menu name' }
        ],
        orderNum: [
          { required: true, message: 'please enter weight' }
        ],
        remark: [
          { required: true, message: 'please enter remark' }
        ],
      }
    };
  },

  computed: {
    title() {
      return this.editType===0 ? 'Add Directory' : (this.editType===1? 'Add Sub' : 'Edit Menu');
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          // 增加loading状态防止重复提交
          this.loading = true;
          if (this.editType === 2) {
            editMenu({}, this.form).then(
              result => {
                this.loading = false;
                if (result && !result.errorCode) {
                  this.$message.success('Save successful!');
                  this.visible = false;
                  this.$emit('reload-table', this.editType, result);
                } else {
                  // 错误处理
                  this.exceptionHandle(result.errorCode);
                }
              }
            );
          } else {
            addMenu({}, this.form).then(
              result => {
                this.loading = false;
                if (result && !result.errorCode) {
                  this.$message.success('Save successful!');
                  this.visible = false;
                  this.$emit('reload-table', this.editType, result);
                } else {
                  // 错误处理
                  this.exceptionHandle(result.errorCode);
                }
              }
            );
          }
        }
      });
    },
    clearValidate(formName) {
      this.visible = false;
      this.$refs[formName].clearValidate();
      // 移除校验结果
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
</style>
