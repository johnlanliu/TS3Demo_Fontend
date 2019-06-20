<template>
    <el-dialog
            :title="'Accessories'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            append-to-body="append"
            @close="resetFields">
        <div class="accessoryCode">
            <el-form ref="form" :model="form4" size="mini" style="text-align: center">
                <el-row>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17011')">LA17011</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17021')">LA17021</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA16111')">LA16111</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17031')">LA17031</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17041')">LA17041</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17081')">LA17081</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17051')">LA17051</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA16121 Roo')">LA16121 Roo</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA16121 Coo')">LA16121 Coo</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17121 Roo')">LA17121 Roo</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17121 Aoo')">LA17121 Aoo</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 1"
                                       type="primary" style="width: 100px" @click="handleNameClick('LA17121 Coo')">LA17121 Coo</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button v-if="shown === 0 || shown === 2"
                                       type="primary" style="width: 100px" @click="handleNameClick('BP17021')">BP17021</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button
                                    v-if="shown === 0 || shown === 2"
                                    type="primary" style="width: 100px" @click="handleNameClick('BP18021')">BP18021</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary" style="float: right">Add</el-button>
                </el-row>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>

export default {
  name: 'AccessoryDetailForm',
  data: function() {
    return {
      isOpen: false,
      append: true,
      productName: this.product,
      form4: {
        accessoryName: '',
      },
    };
  },
  props: {
    product: {
      type: String,
      default: '',
    }
  },
  computed: {
    shown: function() {
      if (this.product === '4" TrackLight (UT1611)' || this.product === '6" TrackLight (UT1711)') {
        return 1;
      } else if (this.product === 'In Dash GPS (UT1508)' || this.product === '5" ThermoTrack (UT1702)'
          || this.product === '6" ThermoTrack (UT1802)') {
        return 2;
      } else {
        return 0;
      }
    }
  },
  methods: {
    showDialog() {
      this.isOpen = true;
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>

</style>