import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

hljs.configure({
    languages: ['javascript', 'css', 'html']
});
const config = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline','strike'],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'],
        ],
        syntax: {
            highlight: (function() {
                if (hljs == null) return null;
                return function(text) {
                    let result = hljs.highlightAuto(text);
                    return result.value;
                };
            })(),
            interval: 1000
        }
    },
    formats: [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'script',
        'list', 'bullet', 'indent', 'font',
        'color', 'background', 'align',
        'link', 'image', 'code',
        'clean',
    ],
};

export default class Articles extends Component {

    // static propTypes = {
    //     defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    //     onChange: PropTypes.func,
    // }
    //
    // static defaultProps = {
    //     defaultValue: '',
    //     onChange: () => {},
    // }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         text: '',
    //     };
    //     this.editor  = null;
    //     this.editorRef = null;
    // }

    // handleClick = () => {
    //     console.log(this.editor)
    //     const val = this.editor.getContents();
    //     console.log(val);
    // }

    // handleChange = (value, delta, source, editor) => {
    //     // console.log(value)
    //     this.setState({
    //         text: value,
    //     });
    //     const val = editor.getContents();
    //     const { onChange } = this.props;
    //     onChange(value);
    // }

    // attachRef = () => {
    //     if(typeof this.editorRef.getEditor === 'function') {
    //         this.editor = this.editorRef.getEditor();
    //     }
    // }
    // componentDidMount() {
    //     this.attachRef();
    // }
    // componentDidUpdate() {
    //     this.attachRef();
    // }
    render() {
        // const { text } = this.state;
        // const { defaultValue } = this.props;
        return (
            <ReactQuill
                placeholder={"请输入文章"}
                theme={"snow"}
                modules={config.modules}
                formats={config.formats}
                {...this.props}
            />
        );
    }
}
