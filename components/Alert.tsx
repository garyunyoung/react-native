import { Alert as ReactAlert } from 'react-native'

export default function renderAlert(
  title: string,
  body: string,
  button: string
) {
  return ReactAlert.alert(title, body, [{ text: button }])
}
