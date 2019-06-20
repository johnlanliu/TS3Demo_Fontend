<template>
    <el-dialog
            :title="'Accessories'"
            :center="true"
            top="15vh"
            :visible.sync="isOpen"
            append-to-body="append"
            @close="resetFields">
        <div class="accessoryCode">
            <el-form ref="form" :model="form4" size="mini">
                <el-row>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17011')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17021')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA16111')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17031')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17041')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17081')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17051')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA16121 Roo')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA16121 Coo')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17121 Roo')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17121 Aoo')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('LA17121 Coo')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('BP17021')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="handleNameClick('BP18021')">4" TrackLight</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
// import { productName } from './ProductDetailForm.Vue';

export default {
  name: 'AccessoryDetailForm',
  data: function() {
    return {
      isOpen: false,
      form4: {
        accessoryName: '',
      },
    };
  },
    props: {
        form: [Object]
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