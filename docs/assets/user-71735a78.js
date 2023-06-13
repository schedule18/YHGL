import{_ as k,d as E,o as v,c as T,a as p,b as l,w as o,F,e as s,t as c}from"./index-c4b406ba.js";import{E as I,a as P,b as U}from"./el-table-column-40dd5d89.js";import{E as N,a as z,b as L,c as W}from"./el-form-item-0c6e9fab.js";import{g as $,a as D,d as O,b as B,u as A,E as S}from"./user-eb0ed749.js";import{E as u}from"./el-tag-6021fadc.js";import{E as M,a as j,b as q}from"./el-pagination-ba5a53ac.js";/* empty css                   */import{c as G}from"./cloneDeep-2902dfcb.js";import"./index-3a017d50.js";const H=E({data(){return{users:[],page:{total:0,current:1,size:6},searchId:null,dialogFormVisible:!1,user:{createTime:new Date,email:"",id:0,password:"",state:1,userName:"",userType:"学生"},formLabelWidth:80}},mounted(){this.getCategoriesPage(1)},methods:{search(){if(this.searchId==null||this.searchId==""){alert("请输入用户编号后查询");return}$(this.searchId).then(e=>{e.data==null?this.users=[]:(this.users=[],this.users.push(e.data.userinfo))}).catch(e=>{console.log(e)})},research(){this.searchId=null,this.getCategoriesPage(1)},toEdit(e){this.dialogFormVisible=!0,this.user=G(e)},getCategoriesPage(e){D({current:e,size:6,colums:[]}).then(m=>{console.log(m);const g=m.data.page;this.users=g.records,this.page=g}).catch(m=>{console.log(m)})},currentchange(e){this.getCategoriesPage(e),this.page.current=e},del(e){confirm("是否删除")==!0&&console.log(e),console.log(e),O(e).then(a=>{if(a.success)this.getCategoriesPage(this.page.current);else return!1}).catch(a=>{})},toAdd(){this.dialogFormVisible=!0,this.user={createTime:new Date,email:"",id:0,password:"",state:1,userName:"",userType:"学生"}},save(){const e=this.user;e.id==0?B(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getCategoriesPage(this.page.current),u(a.msg);else return u(a.msg),!1}).catch(a=>{u("网络错误联系管理员")}):A(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getCategoriesPage(this.page.current),u(a.msg);else return u(a.msg),!1}).catch(a=>{u("网络错误联系管理员")})}}}),J={style:{"margin-top":"10px"}},K={style:{width:"95%",margin:"0 auto"}},Q={style:{width:"95%",margin:"0 auto"}},R={class:"block"},X={class:"dialog-footer"};function Y(e,a,m,g,Z,x){const h=L,i=N,r=z,d=U,b=I,w=M,n=j,f=q,_=S,V=W,y=P;return v(),T(F,null,[p("div",J,[p("div",K,[l(i,{label:"用户编号","label-width":80,style:{display:"inline-flex","margin-right":"10px"}},{default:o(()=>[l(h,{modelValue:e.searchId,"onUpdate:modelValue":a[0]||(a[0]=t=>e.searchId=t),placeholder:"请输入用户编号"},null,8,["modelValue"])]),_:1}),l(r,{type:"primary",onClick:e.search},{default:o(()=>[s("查询")]),_:1},8,["onClick"])]),p("div",Q,[l(r,{type:"info",onClick:e.research},{default:o(()=>[s("重置")]),_:1},8,["onClick"]),l(r,{type:"success",onClick:e.toAdd},{default:o(()=>[s("添加 ")]),_:1},8,["onClick"])]),l(b,{data:e.users,style:{width:"95%",margin:"0 auto"}},{default:o(()=>[l(d,{prop:"id",label:"编号",width:"80"}),l(d,{prop:"userName",label:"用户名称",width:"200"}),l(d,{prop:"email",label:"邮箱",width:"200"}),l(d,{prop:"userType",label:"用户类型",width:"120"}),l(d,{label:"状态",width:"120"},{default:o(t=>[s(c(t.row.state==1?"启用":"不启用"),1)]),_:1}),l(d,{label:"创建时间",width:"120"},{default:o(t=>[s(c(t.row.createTime!=null?t.row.createTime.replace("T"," ").slice(0,19):""),1)]),_:1}),l(d,{fixed:"right",label:"功能管理",width:"140"},{default:o(t=>[l(r,{type:"warning",link:"",size:"small",onClick:C=>e.toEdit(t.row)},{default:o(()=>[s("更新")]),_:2},1032,["onClick"]),l(r,{type:"danger",link:"",size:"small",onClick:C=>e.del(t.row.id)},{default:o(()=>[s("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(w,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,style:{width:"95%",margin:"0 auto"},onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),l(y,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":a[8]||(a[8]=t=>e.dialogFormVisible=t),title:"用户编辑"},{footer:o(()=>[p("span",X,[l(r,{onClick:a[7]||(a[7]=t=>e.dialogFormVisible=!1)},{default:o(()=>[s("取消")]),_:1}),l(r,{type:"primary",onClick:e.save},{default:o(()=>[s("保存 ")]),_:1},8,["onClick"])])]),default:o(()=>[l(V,{model:e.user},{default:o(()=>[l(i,{label:"用户名称","label-width":e.formLabelWidth},{default:o(()=>[l(h,{modelValue:e.user.userName,"onUpdate:modelValue":a[1]||(a[1]=t=>e.user.userName=t),placeholder:"请输入类型名称",style:{width:"80%"}},null,8,["modelValue"])]),_:1},8,["label-width"]),l(i,{label:"密码","label-width":e.formLabelWidth},{default:o(()=>[l(h,{modelValue:e.user.password,"onUpdate:modelValue":a[2]||(a[2]=t=>e.user.password=t),type:"password",placeholder:"请输入密码",style:{width:"80%"}},null,8,["modelValue"])]),_:1},8,["label-width"]),l(i,{label:"邮箱","label-width":e.formLabelWidth},{default:o(()=>[l(h,{modelValue:e.user.email,"onUpdate:modelValue":a[3]||(a[3]=t=>e.user.email=t),type:"email",placeholder:"请输入邮箱",style:{width:"80%"}},null,8,["modelValue"])]),_:1},8,["label-width"]),l(i,{label:"用户类型","label-width":e.formLabelWidth},{default:o(()=>[l(f,{modelValue:e.user.userType,"onUpdate:modelValue":a[4]||(a[4]=t=>e.user.userType=t),placeholder:"请选择用户类型",style:{width:"80%"}},{default:o(()=>[l(n,{label:"学生",value:"学生"}),l(n,{label:"教师",value:"教师"}),l(n,{label:"教辅",value:"教辅"}),l(n,{label:"管理员",value:"管理员"})]),_:1},8,["modelValue"])]),_:1},8,["label-width"]),l(i,{label:"状态","label-width":e.formLabelWidth},{default:o(()=>[l(f,{modelValue:e.user.state,"onUpdate:modelValue":a[5]||(a[5]=t=>e.user.state=t),placeholder:"请选择状态",style:{width:"80%"}},{default:o(()=>[l(n,{label:"启用",value:1}),l(n,{label:"不启用",value:0})]),_:1},8,["modelValue"])]),_:1},8,["label-width"]),l(i,{label:"创建时间","label-width":e.formLabelWidth},{default:o(()=>[p("div",R,[l(_,{modelValue:e.user.createTime,"onUpdate:modelValue":a[6]||(a[6]=t=>e.user.createTime=t),type:"datetime",placeholder:"请选择创建时间"},null,8,["modelValue"])])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const ne=k(H,[["render",Y],["__scopeId","data-v-ef657e28"]]);export{ne as default};
