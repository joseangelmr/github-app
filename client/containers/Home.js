/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import {Search} from './../components/index'
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import {blue500, yellow600} from 'material-ui/styles/colors';
import update from 'react-addons-update';
import FontAwesome from 'react-fontawesome';
import Subheader from 'material-ui/Subheader';
import _ from 'lodash'
import {connect} from 'react-redux';
import * as actions from '../../commons/redux/actions';
import Avatar from 'material-ui/Avatar';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import NoFavoriteIcon from 'material-ui/svg-icons/action/favorite-border';
import CircularProgress from 'material-ui/CircularProgress';



export class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            filter: {
                selected: null,
                current: {
                    value: '',
                    label: ''
                },
                active: [],
                query: ''
            },
            isLoading: true
        }

    }

    componentWillMount(){
        this.props.clean()
    }

    renderFilter() {

        let filters = ''

        if (this.state.filter.active.length > 0) {
            {
                filters = this.state.filter.active.map((filter, id)=> {

                    return (

                        <Chip
                            style={{margin: 4}}
                            key={ id }
                        >
                            { filter.label } {' | '} { filter.value }
                            <FontAwesome
                                name='remove'
                                onClick={ this.onRemoveFilter.bind(this, filter) }
                            />
                        </Chip>
                    )

                })

                return filters
            }
        }

        return <div className="no-data">
            No active search
        </div>


    }

    isFav(login) {

        const fav = _.find(this.props.favorites, {'login': login});
        
        if (fav)
            return true
        else
            return false
    }

    renderUsers() {

        if (this.props.filter) {

            if (this.props.filter.items) {
                if (this.props.filter.items.length > 0)
                    return <List>
                        <Subheader>Users</Subheader>
                        {
                            this.props.filter.items.map((user, i) => {

                                return (
                                    <ListItem
                                        key={ i }
                                        primaryText={ user.login }
                                        leftAvatar={<Avatar src={ user.avatar_url } />}
                                        rightIcon={
                                           this.isFav(user.login) ? <FavoriteIcon onClick={ () => { this.props.removeFavorite(user, i) }}/> :
                                           <NoFavoriteIcon onClick={ () => { this.props.setFavorite(user) }}/>
                                        }
                                    />
                                )
                            })
                        }

                    </List>
                else {
                    return <div className="no-data">
                        There is not accounts
                    </div>
                }
            }

        }

        return ''

    }

    onTypeChange(evt) {

        let selected = evt ? evt : null

        this.setState({
            filter: update(this.state.filter, {
                selected: {
                    $set: selected
                },
                current: {
                    value: {
                        $set: ''
                    }
                }
            })
        })


    }

    onValueChange(evt) {
        this.setState({
            filter: update(this.state.filter, {
                current: {
                    value: {
                        $set: evt.target.value
                    },
                    label: {
                        $set: this.state.filter.selected ? this.state.filter.selected.label : null
                    }
                }
            })
        })
    }

    onClick() {

        const {filter} = this.state

        if (filter.selected != null && filter.value != '') {

            this.setState({
                filter: update(this.state.filter, {
                    active: {
                        $push: [filter.current]
                    },
                    current: {
                        value: {
                            $set: ''
                        },
                        label: {
                            $set: ''
                        }
                    },
                    selected: {
                        $set: null
                    }
                })
            })

            // TODO: implement async function
            setTimeout(()=> {
                let query = []
                this.state.filter.active.forEach((item)=> {
                    query.push(String(item.label).toLowerCase() + ':' + item.value)
                })
                this.props.searchUsers(query.join())
            }, 1000)


        }


    }

    onRemoveFilter(item) {

        const filters = this.state.filter.active
        const aux = []

        _.forEach(filters, function (filter) {
            if (filter.value != item.value)
                aux.push(filter)
        });

        this.setState({
            filter: update(this.state.filter, {
                active: {
                    $set: aux
                }
            })
        })

        // TODO: implement async function
        setTimeout(()=> {
            let query = []

            if (this.state.filter.active.length > 0) {
                this.state.filter.active.forEach((item)=> {
                    query.push(String(item.label).toLowerCase() + ':' + item.value)
                })
                this.props.searchUsers(query.join())
            }
            else {
                this.props.clean()
            }


        }, 1000)

    }


    render() {


        const users = this.renderUsers()
        const filter = this.renderFilter()
        const {isLoading} = this.props

        return (
            <div className="component-home">

                <Search
                    className="row"
                    onTypeChange={ this.onTypeChange.bind(this) }
                    onValueChange={ this.onValueChange.bind(this) }
                    onClick={ this.onClick.bind(this) }
                    {...this.state}
                />

                <div className="row filter-wrapper">
                    <div>Searching by:</div>
                    <div className="chips">
                        { filter }
                    </div>

                </div>


                <div className="row users-wrapper">

                    {
                        isLoading ? <CircularProgress className="loading" size={60}/> : ''
                    }

                    <div className="users">
                        { users }
                    </div>
                </div>


            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        filter: state.global.filter,
        isLoading: state.global.isLoading,
        favorites: state.global.favorites
    };
}
function mapDispatchToProps(dispatch) {
    return {
        searchUsers: (query) => {
            dispatch(actions.searchUsers(query))
        },
        clean: () => {
            dispatch({
                type: 'DATA_SEARCH_USERS_CHANGE',
                data: []
            })
        },
        setFavorite : (user) => {
            dispatch(actions.setFavorite(user))
        },
        removeFavorite : (user) => {
            dispatch(actions.removeFavorite(user))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
