/**
 * @file Element utils
 * @module utils/element
 * @author ntnyq <https://github.com/ntnyq>
 */

import { VNode } from 'vue'
import { ElMessage } from 'element-plus'
import type { MessageHandle, MessageOptions } from 'element-plus/lib'

enum ELMessageType {
  SUCCESS = `success`,
  ERROR = `error`,
  INFO = `info`,
  WARNING = `warning`
}
type EMssageContent = string | VNode
type EIMessageOptions = Partial<MessageOptions>

export const message = {
  success (message: EMssageContent, options: EIMessageOptions): MessageHandle {
    return ElMessage({
      type: ELMessageType.SUCCESS,
      message,
      ...options,
    })
  },
  error (message: EMssageContent, options?: EIMessageOptions): MessageHandle {
    return ElMessage({
      type: ELMessageType.ERROR,
      message,
      ...options,
    })
  },
  warning (message: EMssageContent, options?: EIMessageOptions): MessageHandle {
    return ElMessage({
      type: ELMessageType.WARNING,
      message,
      ...options,
    })
  },
  info (message: EMssageContent, options?: EIMessageOptions): MessageHandle {
    return ElMessage({
      type: ELMessageType.INFO,
      message,
      ...options,
    })
  },
}
