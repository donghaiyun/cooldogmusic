<template>
  <main class="user">
    <a-row>
      <a-col :xs="24" :md="5" :xl="{ span: 5, offset: 0 }">
        <div class="user_left">
          <div class="avatar_pic1" v-if="avatar == 1">
            <img src="../assets/image/icon/20100101192932231831.jpg" />
          </div>
          <div class="avatar_pic2" v-else-if="avatar == 2">
            <img src="../assets/image/icon/20100101192933418660.jpg" />
          </div>
          <div class="avatar_pic3" v-else-if="avatar == 3">
            <img src="../assets/image/icon/20100101192935882161.jpg" />
          </div>
          <div class="avatar_pic4" v-else-if="avatar == 4">
            <img :src="imageUrl" />
          </div>
          <div class="avatar_pic0" v-else>
            <img
              src="../assets/image/icon/20100101192931478054.jpg"
            />
          </div>
          <div class="avatar_text">
            <a href="#">哎_哟</a>
            <p>(帐号:kgopen1172701701)</p>
            <a href="#">开通酷狗豪华 VIP>></a>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :md="19" :xl="{ span: 19 }">
        <div class="user_right">
          <h4>我的酷狗</h4>
          <span>Personal information</span>
          <div class="cabs">
            <ul class="cabs_btn">
              <li :class="{ active: active === 1 }">
                <a @click="isShow(1)">修改头像</a>
              </li>
              <li :class="{ active: active === 2 }">
                <a @click="isShow(2)">编辑资料</a>
              </li>
              <li :class="{ active: active === 3 }">
                <a @click="isShow(3)">修改密码</a>
              </li>
              <li :class="{ active: active === 4 }">
                <a @click="isShow(4)">账号安全</a>
              </li>
            </ul>
            <div class="cabs_content" v-if="active === 1">
              <span class="recommand_icon">推荐头像：</span>
              <div class="recommand_avatar">
                <div class="recommand_avatar1">
                  <img
                    src="../assets/image/icon/20100101192932231831.jpg"
                  />
                  <a @click="chooseavatar(1)">选择</a>
                </div>
                <div class="recommand_avatar2">
                  <img
                    src="../assets/image/icon/20100101192933418660.jpg"
                  />
                  <a @click="chooseavatar(2)">选择</a>
                </div>
                <div class="recommand_avatar3">
                  <img
                    src="../assets/image/icon/20100101192935882161.jpg"
                  />
                  <a @click="chooseavatar(3)">选择</a>
                </div>
                <div class="recommand_avatar4">
                  <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                  >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                  <a @click="chooseavatar(4)">选择</a>
                </div>
              </div>
            </div>
            <div class="cabs_content" v-else-if="active === 2">
              <div class="data">
                <div>
                  <p>账号: kgopen1172701701</p>
                </div>
                <div>
                  <p>酷狗ID: 1172701701</p>
                </div>
                昵称: <input :value="user.name" class="name" /><br />
                性别:
                <input type="radio" v-model="sex" name="sex" value="2" />男
                <input type="radio" v-model="sex" name="sex" value="1" />女
                <input
                  type="radio"
                  v-model="sex"
                  name="sex"
                  value="0"
                />其他<br />
                生日:
                <div class="date">
                  <a-date-picker
                    :default-value="moment('2015/01/01', dateFormat)"
                    :format="dateFormat"
                  />
                </div>
                <br />
                地区：
                <div class="area">
                  <a-cascader
                    :options="options"
                    placeholder="请选择"
                    @change="onChange"
                  />
                </div>
                <div>
                  个性签名: <textarea rows="6" cols="30"></textarea><br />
                </div>
                <a href="#" @click="countDown_rev">保存修改</a>
              </div>
            </div>
            <div class="cabs_content" v-else-if="active === 3">
              <div class="verification">
                <div class="verif-wrap">
                  <span>新密码:</span>
                  <a-input-password
                    placeholder="input password"
                    v-model="pass"
                    @blur="valipass"
                  />
                  <!-- <input v-model="pass" @blur="valipass" /> -->
                  <span class="span-cls" :class="passSpan">{{ passMsg }}</span
                  ><br />
                </div>
                <div class="verif-wrap">
                  <span>确认密码:</span>
                  <a-input-password
                    placeholder="input password"
                    v-model="pass2"
                    @blur="valipass2"
                  />
                  <!-- <input v-model="pass2" @blur="valipass2" /> -->
                  <span class="span-cls" :class="pass2Span">{{
                    pass2Msg
                  }}</span>
                </div>
                <div class="submit">
                  <a href="#" @click="countDown_pass">保存密码</a>
                </div>
              </div>
            </div>
            <div class="cabs_content" v-else>
              <div class="mail">
                <div class="mail_span" v-if="bindcount == 1">
                  <div class="mail_pic">
                    <img src="../assets/image/icon/mail.jpg" />
                  </div>
                  <span class="mail_span1">邮箱</span>
                  <span class="mail_span2">(可用于找回密码和登录帐号)</span>
                  <span class="mail_span3">状态:</span>
                  <span class="mail_span4">未绑定</span>
                  <a class="mail_btn" href="javascript:;" @click="show()"
                    >立刻绑定</a
                  >
                </div>
                <div class="mail_span" v-else>
                  <div class="mail_pic">
                    <img src="../assets/image/icon/mail.jpg" />
                  </div>
                  <span class="mail_span1">邮箱</span>
                  <span class="mail_span2">(可用于找回密码和登录帐号)</span>
                  <span class="mail_span3">状态:</span>
                  <span class="mail_span5">已绑定</span>
                  <a
                    class="mail_btn"
                    href="javascript:;"
                    type="primary"
                    @click="showModal"
                    >解除绑定</a
                  >
                  <a-modal v-model="visible" title="确认框" @ok="handleOk">
                    <p>真的要解除绑定吗？</p>
                  </a-modal>
                </div>
                <div class="mail_add" v-show="isShow2">
                  <span>请输入邮箱:</span>
                  <a-input
                    placeholder="Basic usage"
                    class="mail_input"
                    v-model="mail"
                    @blur="mailpass"
                  />
                  <span class="span_mail" :class="mailSpan">{{ mailMsg }}</span>
                  <a
                    class="mail_btn"
                    href="javascript:;"
                    @click="
                      hide();
                      countDown();
                      bind();
                    "
                    >确定</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </main>
</template>
<script>
import moment from "moment";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      active: 1,//选择器
      avatar: 0,//头像的值
      loading: false,//上传
      imageUrl: '',//上传的图片
      user: { name: "dalao" },
      sex: 2,
      dateFormat: "YYYY/MM/DD",
      options: [
        {
          value: "北京",
          label: "北京",
          children: [
            { label: "东城" },
            { label: "西城" },
            { label: "朝阳" },
            { label: "丰台" },
            { label: "石景山" },
            { label: "海淀" },
            { label: "门头沟" },
            { label: "房山" },
            { label: "通州" },
            { label: "顺义" },
            { label: "昌平" },
            { label: "大兴" },
            { label: "平谷" },
            { label: "怀柔" },
            { label: "密云" },
            { label: "延庆" },
          ],
        },
        {
          value: "上海",
          label: "上海",
          children: [
            { label: "崇明" },
            { label: "黄浦" },
            { label: "卢湾" },
            { label: "徐汇" },
            { label: "长宁" },
            { label: "静安" },
            { label: "普陀" },
            { label: "闸北" },
            { label: "虹口" },
            { label: "杨浦" },
            { label: "闵行" },
            { label: "宝山" },
            { label: "嘉定" },
            { label: "浦东" },
            { label: "金山" },
            { label: "松江" },
            { label: "青浦" },
            { label: "南汇" },
            { label: "奉贤" },
          ],
        },
        {
          value: "广东",
          label: "广东",
          children: [
            { label: "广州" },
            { label: "深圳" },
            { label: "珠海" },
            { label: "东莞" },
            { label: "中山" },
            { label: "佛山" },
            { label: "惠州" },
            { label: "河源" },
            { label: "潮州" },
            { label: "江门" },
            { label: "揭阳" },
            { label: "茂名" },
            { label: "梅州" },
            { label: "清远" },
            { label: "汕头" },
            { label: "汕尾" },
            { label: "韶关" },
            { label: "顺德" },
            { label: "阳江" },
            { label: "云浮" },
            { label: "湛江" },
            { label: "肇庆" },
          ],
        },
      ],
      pass: "", //接文本框中的值
      pass2: "", //接文本框中的值
      passSpan: {
        success: false,
        fail: false,
      },
      pass2Span: {
        success: false,
        fail: false,
      },
      passMsg: "", //保存新密码的错误提示
      pass2Msg: "", //保存确认密码的错误提示
      mail: "",
      mailSpan: {
        success: false,
        fail: false,
      },
      mailMsg: "",
      isShow2: false,//邮箱地址的显示和隐藏
      bindcount: 1,//切换绑定和未绑定的显示
      visible: false,//弹窗的值
    };
  },
  methods: {
    moment,
    onChange(value) {
      console.log(value);
    },
    isShow(i) {
      this.active = i;
    },
    chooseavatar(i) {
      this.avatar = i;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    valipass() {
      //定义新密码正则表达式：
      var reg = /^[0-9a-zA-Z]{6,12}$/;
      if (reg.test(this.pass) == true) {
        //就修改span为验证通过的样子
        this.passSpan = {
          success: true,
          fail: false,
        };
        this.passMsg = " √ 密码格式正确";
      } else {
        //否则如果验证失败
        //就修改span为验证失败的样式
        this.passSpan = {
          success: false,
          fail: true,
        };
        this.passMsg = " × 请输入6-12数字或字母";
      }
    },
    valipass2() {
      var reg = /^[0-9a-zA-Z]{6,12}$/;
      if (reg.test(this.pass) == true && this.pass2 == this.pass) {
        //就修改span为验证通过的样子
        this.pass2Span = {
          success: true,
          fail: false,
        };
        this.pass2Msg = " √ 确认密码格式正确";
      } else {
        //否则如果验证失败
        //就修改span为验证失败的样式
        this.pass2Span = {
          success: false,
          fail: true,
        };
        this.pass2Msg = " × 确认密码格式不正确";
      }
    },
    mailpass() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.mail) == true) {
        //就修改span为验证通过的样子
        this.mailSpan = {
          success: true,
          fail: false,
        };
        this.mailMsg = " √ 邮箱格式正确";
      } else {
        //否则如果验证失败
        //就修改span为验证失败的样式
        this.mailSpan = {
          success: false,
          fail: true,
        };
        this.mailMsg = " × 请输入正确的邮箱";
      }
    },
    show() {
      this.isShow2 = true;
    },
    hide() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.mail) == true) {
        this.isShow2 = false;
      }
    },
    bind() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.mail) == true) {
        this.bindcount = 2;
      }
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      this.bindcount = 1;
    },
    countDown() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.mail) == true) {
        let secondsToGo = 3;
        const modal = this.$success({
          title: "恭喜，绑定成功",
          content: `${secondsToGo}`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `${secondsToGo}`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
      } else {
        let secondsToGo = 3;
        const modal = this.$error({
          title: "绑定失败，请确认邮箱格式！",
          content: `${secondsToGo}`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `${secondsToGo}`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
      }
    },
    countDown_rev() {
      let secondsToGo = 3;
      const modal = this.$success({
        title: "修改成功",
        content: `${secondsToGo}`,
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `${secondsToGo}`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    },
    countDown_pass() {
      var reg = /^[0-9a-zA-Z]{6,12}$/;
      if (reg.test(this.pass) == true && this.pass2 == this.pass) {
        let secondsToGo = 3;
        const modal = this.$success({
          title: "密码已保存",
          content: `${secondsToGo}`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `${secondsToGo}`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
      } else {
        let secondsToGo = 3;
        const modal = this.$error({
          title: "保存失败，请确认密码格式！",
          content: `${secondsToGo}`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `${secondsToGo}`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
      }
    },
  },
};
</script>
<style lang="scss">
.user {
  width: 960px;
  margin: 30px auto;
  padding: 0;
  border: 1px solid #ccc;
  .user_left {
    background-color: #e2f4ff;
    display: flex;
    height: 40rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .avatar_pic0,
    .avatar_pic1,
    .avatar_pic2,
    .avatar_pic3,
    .avatar_pic4 {
      img {
        margin-top: 2rem;
        height: 180px;
        width: 180px;
        border: 0.5rem solid #fff;
      }
    }
    .avatar_text {
      a:first-child {
        display: block;
        padding: 0.75rem 0;
        font-size: 0.875rem;
        font-weight: bold;
      }
      p {
        font-size: 0.8125rem;
      }
      a:last-child {
        display: block;
        padding: 0.75rem 0;
        font-size: 0.8125rem;
        color: #ff9600;
      }
    }
    .user-content {
      background-color: #777777;
      height: 20rem;
    }
  }
  ul {
    margin-left: -1px;
    zoom: 1;
  }
  .user_right {
    height: 40rem;
    padding: 5px;
    border-left: 1px solid #ccc;
  }
  h4 {
    float: left;
    height: 24px;
    font: 20px/24px Microsoft Yahei, "\5b8b\4f53", sans-serif;
    color: #7b7b7b;
    margin-right: 10px;
  }
  span {
    font-size: 13px;
    line-height: 2.4;
    font-family: arial, "\5b8b\4f53", sans-serif;
    padding-top: 8px;
    color: #a1a1a1;
  }
  .cabs {
    padding: 10px 5px;
  }
  .cabs_btn li {
    display: inline-block;
    border-style: solid;
    border-width: 1px;
    height: 29px;
    width: 25%;
    line-height: 29px;
    font-size: 14px;
    border-color: #b5b5b5 #b5b5b5 #54ade7;
    font-weight: bold;
    border-radius: 2px 2px 0 0;
    text-align: center;
    cursor: pointer;
  }
  .cabs_btn li a {
    display: inline-block;
    color: #7b7b7b;
    width: 100%;
    height: 29px;
  }
  .cabs_btn li.active {
    position: relative;
    border-top-width: 2px;
    border-color: #54ade7 #54ade7 #fff;
    margin-top: -1px;
  }
  li.active > a {
    color: #54ade7;
  }
  a:focus {
    outline: 0;
  }
  .cabs_content {
    .recommand_icon {
      position: absolute;
      top: 120px;
      left: -3px;
      width: 140px;
      height: 29px;
      padding-left: 55px;
      line-height: 10px;
      font-size: 14px;
      color: #ffffff;
      display: block;
      background-position: 0 -200px;
      background-image: url(../assets/image/icon/kg_uc_splice.png);
      background-repeat: no-repeat;
    }
    .recommand_avatar1,
    .recommand_avatar2,
    .recommand_avatar3,
    .recommand_avatar4 {
      width: 110px;
      height: 160px;
      margin-bottom: 10px;
      overflow: hidden;
      position: absolute;
      top: 200px;
      left: 100px;
      img {
        border: 1px solid #ccc;
        width: 110px;
        height: 110px;
      }
      a {
        display: block;
        width: 80px;
        height: 27px;
        line-height: 27px;
        padding: 0 20px;
        color: #fff;
        font-weight: 700;
        font-size: 13px;
        background-color: #68c4ff;
        text-align: center;
        margin-top: 20px;
        margin-left: 15px;
        border-radius: 2%;
      }
      a:hover {
        background-color: #8ad2ff;
      }
    }
    .recommand_avatar2 {
      left: 250px;
    }
    .recommand_avatar3 {
      left: 400px;  
    }
    .recommand_avatar4 {
      left: 550px;
      a {margin-top: 18px;}
      .avatar-uploader{
        padding: 0;
        margin: 0;
      }
      .ant-upload.ant-upload-select-picture-card>.ant-upload {
        padding: 0;
        margin: 0;
      }
      .ant-upload.ant-upload-select-picture-card {
        width: 110px;
        height: 110px;
        margin:0;
      }
      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }
    }
    .data {
      padding: 30px 0 0 100px;
    }
    .data :not(:first-child):not(:last-child) {
      margin-top: 35px;
    }
    .name {
      width: 292px;
    }
    .date,
    .area {
      display: inline-block;
    }
    .ant-cascader-picker-label {
      font-size: 16px;
      color: #7b7b7b;
      position: absolute;
      top: -95%;
      overflow: visible;
      text-overflow: visible;
    }
    .data a {
      display: block;
      width: 100px;
      height: 27px;
      line-height: 27px;
      padding: 0 20px;
      color: #fff;
      font-weight: 700;
      font-size: 13px;
      background-color: #68c4ff;
      text-align: center;
      margin-top: 20px;
      margin-left: 72px;
    }
    .data a:hover {
      background-color: #8ad2ff;
    }
    .verification {
      width: 700px;
      height: 13rem;
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      .verif-wrap {
        display: flex;
        justify-content: center;
        span:first-child {
          flex: 0 0 10%;
        }

        input {
          flex: 0 0 40%;
        }
        .span-cls {
          flex: 0 0 30%;
          text-align: left;
          padding-left: 0.5rem;
        }
      }
      .submit > a:hover {
        background-color: #8ad2ff;
      }
      a {
        display: block;
        width: 100px;
        height: 27px;
        margin-left: 30%;
        line-height: 27px;
        color: #fff;
        font-weight: 700;
        font-size: 13px;
        background-color: #68c4ff;
        text-align: center;
        margin-top: 10px;
        border-radius: 5%;
      }

      // .span-cls {
      //   display: inline-block;
      // }
      .success {
        background-color: lightGreen;
        border: green;
        color: green;
        height: 32px;
        line-height: 20px;
        margin-top: 8px;
      }
      .fail {
        background-color: pink;
        border: red;
        color: red;
        height: 32px;
        line-height: 20px;
        margin-top: 8px;
      }
    }
    .mail {
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 20px;
      .mail_pic {
        display: inline-block;
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
      .mail_span1,
      .mail_span2,
      .mail_span3,
      .mail_span4,
      .mail_span5 {
        display: inline-block;
      }
      .mail_span1 {
        margin-left: 5px;
        font-size: 20px;
        color: #000;
      }
      .mail_span2,
      .mail_span3,
      .mail_span4,
      .mail_span5 {
        font-size: 16px;
      }
      .mail_span3 {
        margin-left: 33%;
      }
      .mail_span4 {
        color: #000;
      }
      .mail_span5 {
        color: #68c4ff;
      }
      a {
        display: inline-block;
        width: 100px;
        height: 27px;
        margin-left: 4%;
        line-height: 27px;
        color: #fff;
        font-weight: 700;
        font-size: 13px;
        background-color: #68c4ff;
        text-align: center;
        margin-top: 10px;
        border-radius: 5%;
      }
      .mail_btn:hover {
        background-color: #8ad2ff;
      }
      .mail_add {
        display: flex;
        align-items: center;
        span:first-child {
          text-align: center;
          flex: 0 0 15%;
        }
        input {
          flex: 0 0 50%;
        }
        .span_mail {
          flex: 0 0 30%;
          text-align: left;
          padding-left: 0.5rem;
          text-align: center;
        }

        .mail_input {
          display: inline-block;
        }
        .success {
          background-color: lightGreen;
          border: green;
          color: green;
          height: 32px;
          line-height: 20px;
          margin-top: 0px;
        }
        .fail {
          background-color: pink;
          border: red;
          color: red;
          height: 32px;
          line-height: 20px;
          margin-top: 0px;
        }
        a {
          display: block;
          margin-left: -70%;
          margin-top: 25%;
        }
      }
    }
  }
}

// 媒体查询
@media screen and(max-width: 767.999px) {
  main.user {
    margin-top: 5rem;
    .avatar {
      height: 8rem;
    }
  }
}
</style>