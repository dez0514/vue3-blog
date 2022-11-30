export interface NotificationProps {
  type: 'error' | 'info' | 'success'
  message: string
  duration?: number
}
export interface NoticeItem extends NotificationProps {
  id: string
}