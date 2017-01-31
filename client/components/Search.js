/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import FontAwesome from 'react-fontawesome';

export default class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { selected, current } = this.props.filter
        const options = [
            { value: 'location', label: 'Location', type: 'text' },
            { value: 'language', label: 'Language', type: 'text'  },
            { value: 'followers', label: 'Followers', type: 'text'  }
        ];

        return (
            <div className="component-search">

                <div className="row justify-content-center">

                    <div className="select col-lg-2 col-md-2 col-sm-3 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-2">
                        <Select
                            className="search-select"
                            name="form-field-name"
                            placeholder = "Type..."
                            value = { selected ? selected.value : null }
                            options={ options }
                            onChange={ this.props.onTypeChange }
                        />
                    </div>


                    <div className="text-field col-lg-4 col-md-4 col-sm-5 col-xs-12">

                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <TextField
                                className="text-search"
                                hintText="Search"
                                onChange= { this.props.onValueChange }
                                type = { selected ? selected.type : 'text' }
                                value = { current.value }
                            />
                        </div>

                        <div className="icon col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <FontAwesome
                                name='search'
                                size='2x'
                                onClick={ this.props.onClick }
                            />
                        </div>

                    </div>


                </div>
                
                





            </div>
        );
    }
}