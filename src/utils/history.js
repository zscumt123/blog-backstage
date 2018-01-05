import createHistroy from 'history/createBrowserHistory';
import { Modal } from 'antd';
const confirm = Modal.confirm;
const getUserConfirmation = (message, callback) => {
    confirm({
      title: '提示信息',
      content: message,
      onOk() {
        callback(true);
      },
      onCancel(){
        callback(false);
      }
    })
  }
export default createHistroy({
    getUserConfirmation
});