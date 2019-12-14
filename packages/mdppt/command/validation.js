const { findExistSync, logger } = require('@mdppt/utils')

const verifyFileNmae = name => {
  if (!/[A-Za-z_.-]+\.md$/.test(name)) {
    return {
      isValid: false,
      message: logger.yellow.raw('请输入合法的文件名称, 支持[A-Za-z_.-], 并以.md结尾')
    }
  }
  if (findExistSync(process.cwd(), name)) {
    return {
      isValid: false,
      message: logger.red.raw('文件已经存在, 请换一个名称重新创建.')
    }
  }
  return {
    isValid: true
  }
}

module.exports = {
  verifyFileNmae
}
