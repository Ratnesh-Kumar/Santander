var colorConstants = require('../../config/colorConstant');
const dialogModal = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  topContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 10,
  },
  modalHorizontalLine: {
    height: 0.4,
    opacity: 0.7,
    backgroundColor: colorConstants.LOGIN_BUTTON_BLUE,
  },
  messageTopView: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  messageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 13,
    color: 'black',
    marginBottom: 5,
  },
  titleMessageText: {
    fontSize: 16,
    paddingBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  actionView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorConstants.LOGIN_BUTTON_BLUE,
    padding: 10,
  },

  actionAgreeDisagreeAText: {
    fontSize: 16,
    color: colorConstants.LOGIN_BUTTON_BLUE,
    alignItems: 'center',
    padding: 10,
  },

  cardNumberInputView: {
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 1,
    borderWidth: 1,
    height: 40,
    padding: 5,
    borderColor: '#848484',
  },
};
export default dialogModal;
