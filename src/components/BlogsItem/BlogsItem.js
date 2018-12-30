import React from 'react';
import itemShape from '../../helpers/propz/itemShape';
import './BlogsItem.scss';

class BlogItem extends React.Component {
  static propTypes = {
    blog: itemShape,
  }

  render() {
    const { blog } = this.props;
    return (
      <li className="blog-item">
        <span className="col-md-4">{blog.name}</span>
        <span className="col-md-6">{blog.url}</span>
        <span className="col-md-1">
          <button className="btn btn-danger">X</button>
        </span>
        <div className="col-md-1 form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input item-checkbox"
            id="blog-check"
            // checked={blog.isCompleted}
          />
          <label className="form-check-label" htmlFor="blog-check">
            Done
          </label>
        </div>
      </li>
    );
  }
}

export default BlogItem;
