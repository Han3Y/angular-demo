import { MockRequest} from '@delon/mock';
let list = [
  {"id":"f39645b8-378a-4611-9ffd-e475b766708b","name":"报告测试计划","badwmc":"德化陶瓷制作","qsrq":"2018-09-11","jsrq":"2018-09-11","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"110","companyId":"574c58a5-5eb9-4ee4-8050-d26296d22086","cjr":"管理员","cjsj":"2018-09-11 14:38:58"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e19","name":"国电北京分公司1","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e11","name":"国电北京分公司2","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e12","name":"国电北京分公司3","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e13","name":"国电北京分公司4","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e14","name":"国电北京分公司5","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e15","name":"国电北京分公司6","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e16","name":"国电北京分公司7","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e17","name":"国电北京分公司8","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e18","name":"国电北京分公司9","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e29","name":"国电北京分公司10","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e39","name":"国电北京分公司11","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e49","name":"国电北京分公司12","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e59","name":"国电北京分公司13","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e69","name":"国电北京分公司14","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e79","name":"国电北京分公司15","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e89","name":"国电北京分公司16","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e99","name":"国电北京分公司17","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e32","name":"国电北京分公司18","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e33","name":"国电北京分公司19","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e44","name":"国电北京分公司20","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"},
  {"id":"ef8f517b-8015-48cc-a35d-6af9c4366e55","name":"国电北京分公司21","badwmc":"中国国电","qsrq":"2018-08-23","jsrq":"2018-08-30","jhlymc":"平台系统创建","dwjclxmc":"单位检查","zzjgdm":"0100001","companyId":"98c4a503-a0cd-47cf-839d-64911a4df7f2","cjr":"管理员","cjsj":"2018-08-23 10:47:45"}];
function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi,
    ps = +params.ps,
    start = (pi - 1) * ps;

  if (params.name) {
    ret = ret.filter(data => data.name.indexOf(params.name) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function removePlan(ids: string[]): boolean {
  ids.forEach(no => {
    const idx = list.findIndex(w => w.id === no);
    if (idx !== -1) list.splice(idx, 1);
  });
  return true;
}

export const APIS = {
  'POST /clearMsg':(req:MockRequest) =>{
      return {
        status:0,
        data:true
      }
  },
  'GET /getMsg':(req:MockRequest)=>{
      return{
        status:0,
        data: [
          {
            id: '000000006',
            title: '曲丽丽 评论了你',
            description: '描述信息描述信息描述信息',
            datetime: '2017-08-07',
            link:'/403',
            type: '消息',
          },
          {
            id: '000000007',
            title: '朱偏右 回复了你',
            description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
            datetime: '2017-08-07',
            type: '消息',
          },
          {
            id: '000000008',
            title: '标题',
            description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
            datetime: '2017-08-07',
            type: '消息',
          }
        ]
      };
  },
  'GET /headMenu':(req:MockRequest)=>{
    return {
      status:0,
      data:[
        {
          name:'日志信息',
          link:'/log',
          icon:'file'
        },
        {
          name:'用户管理',
          link:'/userManagement',
          icon:'team'
        },
        {
          name:'角色管理',
          link:'/roleManagement',
          icon:'user'
        },
        {
          name:'系统设置',
          link:'/sysManagement',
          icon:'setting'
        }
      ]
    };
  },
  'GET /headOperations':(req:MockRequest)=>{
    return {
      status:0,
      data:[
        {
          name:'关机',
          type:'shutDown'
        },
        {
          name:'重启',
          type:'reboot'
        },
        {
          name:'升级',
          type:'upgrade'
        },
        {
          name:'导出',
          type:'export'
        },
        {
          name:'版本信息',
          type:'version'
        },
        {
          name:'恢复出厂',
          type:'restore'
        }
      ]
    };
  },
  'POST /changePassword':(req:MockRequest) =>{
    return {
      status:0,
      data:true
    }
  },
  'GET /planList':(req:MockRequest)=> {
    return genData(req.queryString);
  },
  'DELETE /plan': (req: MockRequest) => removePlan(req.queryString.ids),
  'GET /companyList':(req:MockRequest) =>{
    return [
      { label: '单位1', value: 'company1' },
      { label: '单位2', value: 'company2' },
      { label: '单位3', value: 'company3' }
    ]
  },
  'GET /userList':(req:MockRequest) =>{
    return [
      { label: '用户1', value: 'user1' },
      { label: '用户2', value: 'user2' },
      { label: '用户3', value: 'user3' }
    ]
  },
};
