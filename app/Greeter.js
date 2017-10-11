//Greeter,js
import React, {Component} from 'react'
import config from './config.json';
import $ from 'jquery';
import Mock from 'mockjs';
import '../app/jquery.alert.css';
import '../app/jquery.alert';

Mock.mock('http://g.cn', {
    'name': '@name',
    'age|1-100': 100,
    'color': '@color'
});

class Greeter extends Component {
    getData() {

        $.ajax({
            url: 'http://g.cn',
        }).done(function (data, status, xhr) {
            $.alert({mess:data});
        })

    }

    render() {
        return (
            <div>
                <button onClick={this.getData}>get</button>
            </div>
        );
    }
}

export default Greeter