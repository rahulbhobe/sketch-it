import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {observer, observe} from 'redux-observers';
import * as ActionCreators from '../store/action_creators';

class ReduxUtils {
  static _observers = [];

  static connect (mapStateToProps, shouldMapDispatchToProps=false) {
    return connect(mapStateToProps, shouldMapDispatchToProps ? this.mapDispatchToProps : null);
  };  

  static mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(ActionCreators, dispatch) };
  };

  static dispatchFunc (observerFunc) {
    return (dispatch, currentState, previousState) => {
      let {actions} = this.mapDispatchToProps(dispatch);
      observerFunc(actions, currentState, previousState);
    };
  };

  static registerObserver (mapStateToPropsFunc, observerFunc, options) {
    this._observers.push(observer(mapStateToPropsFunc, this.dispatchFunc(observerFunc), options));
  };

  static observeChanges (store, options) {
    observe(store, this._observers, options);
  };
};

export default ReduxUtils;
