import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTags } from '../../actions/tagActions';

class Sidebar extends PureComponent {

    componentDidMount() {
        this.props.getTags();
    }

    lightDarkModeToggle = () => {
        localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark')
        localStorage.getItem('mode') === 'dark' ? document.querySelector('body').classList.add('dark') : document.querySelector('body').classList.remove('dark')
    }

    render() {
        return (
            <aside>
                <p><Link to='/'><span role="img" aria-label="home">🏡</span> Home</Link></p>
                <p>Hi <span role="img" aria-label="wave">👋🏼</span> I'm Jed, a web developer.<br/>
                I create this blog just for learning ReactJS and NodeJS.</p>
                <p>Source: <a href="https://flaviocopes.com/">Flaviocopes.com</a></p>
                <p><button onClick={this.lightDarkModeToggle}><span role="img" aria-label="moon">🌓</span> Light|dark mode</button></p>
                <h4>My Recommended Courses</h4>
                <ul>
                    <li>Course 1</li>
                    <li>Course 2</li>
                    <li>Course 3</li>
                    <li>Course 4</li>
                </ul>
                {this.props.tags.data && (
                    <div className="tags-cloud">
                        {this.props.tags.data.map(tag => 
                            <Link key={tag._id} to={`/tag/${tag.slug}`} className={`bg-${tag.slug}`}>{tag.name}</Link>    
                        )}
                    </div>
                )}
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    tags: state.tags
})

export default connect(mapStateToProps, {getTags})(Sidebar);
