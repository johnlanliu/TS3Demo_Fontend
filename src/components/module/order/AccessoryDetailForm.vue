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
                <el-collapse v-model="form4.activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            {{ form4.accessoryName }}
                        </template>
                        <el-row>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17011')">LA17011</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17021')">LA17021</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA16111')">LA16111</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17031')">LA17031</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17041')">LA17041</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17081')">LA17081</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17051')">LA17051</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA16121 Roo')">LA16121 Roo</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA16121 Coo')">LA16121 Coo</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17121 Roo')">LA17121 Roo</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17121 Aoo')">LA17121 Aoo</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('LA17121 Coo')">LA17121 Coo</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 2" :span="6">
                                <el-form-item>
                                    <el-button
                                               type="primary" style="width: 100px" @click="handleNameClick('BP17021')">BP17021</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 2" :span="6">
                                <el-form-item>
                                    <el-button
                                            type="primary" style="width: 100px" @click="handleNameClick('BP18021')">BP18021</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="Price" v-if="form4.showPrice" name="2">
                        <el-row>
                            <el-col :span="10" :offset="6">
                                <el-form ref="form" :model="form4" size="mini" align="right">
                                    <el-form-item label="Unit Price $">
                                        <el-input v-model="form4.price" style="width: 150px; "></el-input>
                                    </el-form-item>
                                    <el-form-item label="Quantity">
                                        <el-input-number
                                                v-model="form4.QTY"
                                                controls-position="right"
                                                :min="1"
                                                style="width: 150px">
                                        </el-input-number>
                                    </el-form-item>
                                </el-form>
                                <el-row>
                                    <el-button type="primary" style="float: right">Add</el-button>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
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
      loading: false,
      form4: {
        accessoryName: 'Type',
        activeName: '1',
        QTY: '',
        showPrice: false,
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
      if (this.product === '4" TrackLight (VT1611)' || this.product === '6" TrackLight (VT1711)') {
        return 1;
      } else if (this.product === 'In Dash GPS (VT1508)' || this.product === '5" ThermoTrack (VT1702)'
          || this.product === '6" ThermoTrack (VT1802)') {
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
      this.form4.activeName = '1';
      this.form4.accessoryName = 'Type';
      this.form4.QTY = '';
      this.form4.showPrice = false;
      this.$refs.form.resetFields();
    },
    handleNext(number) {
      let tempNum = Number(this.form4.activeName);
      let nextNum = tempNum + number;
      this.form4.activeName = nextNum.toString();
    },
    handleNameClick(num) {
      if (this.form4.accessoryName === 'Type') {
        this.form4.accessoryName = num;
        this.form4.showPrice = true;
        this.handleNext(1);
      } else {
        this.resetFields();
        this.form4.accessoryName = num;
        this.form4.showPrice = true;
        this.handleNext(1);
      }
    },
  },
};
</script>

<style scoped>

</style>