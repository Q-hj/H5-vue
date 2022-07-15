/*
 * @Date: 2022-07-04 11:08:33
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-15 16:01:21
 * @Description: 引入vant组件
 */
import Vue from "vue";
import { Button } from "vant";
import { Toast } from "vant";
import { Form } from "vant";
import { Field } from "vant";
import { Stepper } from "vant";

import { RadioGroup, Radio } from "vant";

import { Cascader } from "vant";
import { Popup } from "vant";
import { Icon } from "vant";
import { Row, Col } from "vant";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);
Vue.use(Row).use(Col);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Cascader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Stepper);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Radio);
