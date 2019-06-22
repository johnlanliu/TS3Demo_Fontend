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

                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17011')">
                                        <img src="./pic/Accessories/LA17011.png" alt="LA17011" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17021')">
                                        <img src="./pic/Accessories/la17021.png" alt="la17021" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA16111')">
                                        <img src="./pic/Accessories/LA16111.png" alt="LA1611" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17031')">
                                        <img src="./pic/Accessories/la17031.png" alt="la17031" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17041')">
                                        <img src="./pic/Accessories/LA17041.png" alt="LA17041" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17081')">
                                        <img src="./pic/Accessories/LA17081.png" alt="LA17081" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 1" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                               type="default" @click="handleNameClick('LA17051')">
                                        <img src="./pic/Accessories/LA17051.png" alt="LA17051" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
<!--                            <el-col v-if="shown === 0 || shown === 1" :span="6">-->
<!--                                <el-form-item>-->
<!--                                    <button class="containerButton" style="width: 180px; height: 120px"-->
<!--                                               type="default" @click="handleNameClick('LA16121 R00')">-->
<!--                                        <img src="./pic/Product/VT1611.png" alt="VT1611" width="120" height="120" class="image"/>-->
<!--                                        <div class="overlay">4" TrackLight</div>-->
<!--                                    </button>-->
<!--                                </el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col v-if="shown === 0 || shown === 1" :span="6">-->
<!--                                <el-form-item>-->
<!--                                    <button class="containerButton" style="width: 180px; height: 120px"-->
<!--                                               type="default" @click="handleNameClick('LA16121 C00')">-->
<!--                                        <img src="./pic/Product/VT1611.png" alt="VT1611" width="120" height="120" class="image"/>-->
<!--                                        <div class="overlay">4" TrackLight</div>-->
<!--                                    </button>-->
<!--                                </el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col v-if="shown === 0 || shown === 1" :span="6">-->
<!--                                <el-form-item>-->
<!--                                    <button class="containerButton" style="width: 180px; height: 120px"-->
<!--                                               type="default" @click="handleNameClick('LA17121 R00')">-->
<!--                                        <img src="./pic/Product/VT1611.png" alt="VT1611" width="120" height="120" class="image"/>-->
<!--                                        <div class="overlay">4" TrackLight</div>-->
<!--                                    </button>-->
<!--                                </el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col v-if="shown === 0 || shown === 1" :span="6">-->
<!--                                <el-form-item>-->
<!--                                    <button class="containerButton" style="width: 180px; height: 120px"-->
<!--                                               type="default" @click="handleNameClick('LA17121 A00')">-->
<!--                                        <img src="./pic/Product/VT1611.png" alt="VT1611" width="120" height="120" class="image"/>-->
<!--                                        <div class="overlay">4" TrackLight</div>-->
<!--                                    </button>-->
<!--                                </el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col v-if="shown === 0 || shown === 1" :span="6">-->
<!--                                <el-form-item>-->
<!--                                    <button class="containerButton" style="width: 180px; height: 120px"-->
<!--                                               type="default" @click="handleNameClick('LA17121 C00')">-->
<!--                                        <img src="./pic/Product/VT1611.png" alt="VT1611" width="120" height="120" class="image"/>-->
<!--                                        <div class="overlay">4" TrackLight</div>-->
<!--                                    </button>-->
<!--                                </el-form-item>-->
<!--                            </el-col>-->
                            <el-col v-if="shown === 0 || shown === 2" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                                type="default" @click="handleNameClick('BP17021')">
                                        <img src="./pic/Accessories/BP17021.png" alt="BP17021" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="shown === 0 || shown === 2" :span="6">
                                <el-form-item>
                                    <button class="containerButton" style="width: 150px; height: 100px"
                                                type="default" @click="handleNameClick('BP18021')">
                                        <img src="./pic/Accessories/BP18021.png" alt="BP18021" class="image"/>
                                        <div class="overlay">4" TrackLight</div>
                                    </button>
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
    .containerButton {
        position: relative;
        width: 50%;
        max-width: 300px;
    }

    .image {
        display: block;
        width: 50%;
        height: auto;
        /*transition: .5s ease;*/
        opacity: 1;
        padding-left: 38px;
    }

    .overlay {
        position: relative;
        bottom: 0;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.5); /* Black see-through */
        color: #f1f1f1;
        width: 59%;
        /*transition: .5s ease;*/
        opacity:1;
        color: white;
        font-size: 12px;
        padding: 5px 30px 4px 31px;
        text-align: center;
    }


    .containerButton:hover .image {
        opacity: 0.75;
    }
    .containerButton:hover .overlay {
        opacity: 0.75;
    }

</style>