/**
 * The PostSelector function provides a post selector tool to enable editor to select 
 * posts or any content type, add them or remove them or reorder them.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import { BlockIcon } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import PostList from './postlist';
import { __ } from '@wordpress/i18n';

export default function PostSelector(props) {
    const {posts, selectedPosts, setPosts, attributes, setAttributes} = props;
    const addIcon = <BlockIcon icon="plus" />;
    const removeIcon = <BlockIcon icon="minus" />;
    const [filter, setFilter] = useState('');

    /**
     * Loads posts for the search in post selector.
     */
    const loadPostsBySearch = (e) => {
        setFilter(e.target.value);
        const {postType, postCount, orderBy, order} = attributes;
        let base = postType === 'post' ? 'posts' : 'page' ? 'pages' : postType;
        wp.apiFetch({ path: `/wp/v2/${base}?orderby=${orderBy}&order=${order}&per_page=${postCount}&_embed=1&search=${e.target.value}` }).then(
			(postsArr) => {		
                setPosts(postsArr);
			}
		);
    };

    return (
        <div className="post-selectorContainer">
            <div className="post-selectorAdd">
                <div className="searchbox">
                    <label htmlFor="searchinput">
                        <input
                            id="searchinput"
                            type="search"
                            placeholder={__('Please enter your search query...', 'content-views')}
                            value={filter}
                            onChange={loadPostsBySearch}
                        />
                    </label>
                </div>
                <PostList
                    posts={posts}
                    selectedPosts={selectedPosts}
                    action="add"
                    icon={addIcon}
                    setPosts={setPosts}
                />
            </div>
            <div className="post-selectorRemove">
                <PostList
                    posts={posts}
                    selectedPosts={selectedPosts}
                    action="remove"
                    icon={removeIcon}
                    setPosts={setPosts}
                    setAttributes={setAttributes}
                />
            </div>
        </div>
    )
}
