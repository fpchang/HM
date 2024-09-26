// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "phone": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{title}不能为空"
      },
      {
        "format": "string"
      },
      {
        "minLength": 11,
        "errorMessage": "{title}不能小于 {minLength} 个字符"
      },
      {
        "pattern": "^[1][3,4,5,6,7,8,9][0-9]{9}$",
        "errorMessage": "{title}格式不正确"
      }
    ],
    "title": "员工手机号",
    "label": "员工手机号"
  },
  "role": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "administrator",
            "text": "administrator"
          },
          {
            "value": "manager",
            "text": "manager"
          },
          {
            "value": "normal",
            "text": "normal"
          }
        ]
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "employee_name": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "data_status": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": 0
          },
          {
            "value": 1,
            "text": 1
          }
        ]
      }
    ],
    "defaultValue": 1
  },
  "mark": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "defaultValue": ""
  }
}

const enumConverter = {
  "role_valuetotext": {
    "administrator": "administrator",
    "manager": "manager",
    "normal": "normal"
  },
  "data_status_valuetotext": {
    "0": 0,
    "1": 1
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
