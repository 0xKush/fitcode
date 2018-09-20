import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle } from 'recompose';
import { goalsOperations } from 'app/goals/duck';

import withAuth from 'app/common/withAuth';
import UserHistory from 'app/goals/History.jsx';

const mapStateToProps = state => {
    return {
        macros: state.goals.macros,
        loading: state.goals.loading,
        errorMessage: state.goals.errorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...goalsOperations }, dispatch);
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withAuth
)(UserHistory);
