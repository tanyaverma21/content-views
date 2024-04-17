/**
 * The PostSelector function provides a post selector tool to enable editor to select 
 * posts or any content type, add them or remove them or reorder them.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';
import placeholder from '../../../../images/placeholder-150x150.png';

export default function PostList(props) {
    const {action, icon, setPosts, posts, setAttributes} = props;
    let {selectedPosts} = props;
    /**
     * Adds desired post id to the selectedPosts List.
     * @param {Integer} postId
     */
    const addPost = post => {
        selectedPosts.push(post);
        let updatedPosts = posts.filter(value => value.id !== post.id);
        setPosts(updatedPosts);
	}

    /**
     * Removes desired post id to the selectedPosts List.
     * @param {Integer} postId
     */
    const removePost = post => {
        let index = selectedPosts?.findIndex(rem => rem.id === post.id);
        selectedPosts.splice(index, 1);
        updatePosts(post);
    };

    /**
     * Updates desired post id to the posts List.
     * @param {Integer} postId
     */
    const updatePosts = post => {
        if (posts.findIndex(obj => obj.id === post.id) === -1) {
            let arrayCopy = [...posts];
            arrayCopy.push(post);
            setPosts(arrayCopy);
        }
    }

    let newPosts = action === 'add' ? posts : selectedPosts;

    if (!newPosts || newPosts.length < 1) {
        return (
          <>
            <div className="post-list">{__('No Content Found.', 'content-views')}</div>
          </>
        );
    }

    return (
        <>
        <div className="post-list">
            {newPosts?.length > 0 && newPosts.map((post, index) => (
                <article className="post">
                    <img
                        className="post-figure"
                        src={post && post?._embedded['wp:featuredmedia'] ? post?._embedded['wp:featuredmedia'][0]?.media_details?.sizes?.['thumbnail']?.source_url: placeholder }
                    />
                    <span className="post-body">
                        <span className="post-title">{post?.title?.rendered}</span>
                        <span className='post-meta'>
                            <span className='post-date'>{`Published On: ${window.moment(new Date(post?.date)).format('MMMM Do, YYYY')}`}</span>
                            <span className='post-author'>{`By: ${post?._embedded['author'][0]?.name}`}</span>
                        </span>
                    </span>
                    {action === "remove" && (
                        <span className="button-directions">
                            {index > 0 && (<span className="dashicons dashicons-arrow-up-alt" onClick={() => {
                                let arrayCopy = [...selectedPosts];
                                arrayCopy[index] = selectedPosts[index-1];
                                arrayCopy[index-1] = selectedPosts[index];
                                setAttributes({selectedPosts: arrayCopy});
                                console.log(selectedPosts, 'selectedPosts');
                            }}></span>)}
                            {index + 1 < newPosts?.length && (<span className="dashicons dashicons-arrow-down-alt" onClick={() => {
                                let arrayCopy2 = [...selectedPosts];
                                arrayCopy2[index] = selectedPosts[index+1];
                                arrayCopy2[index+1] = selectedPosts[index];
                                setAttributes({selectedPosts: arrayCopy2});
                                console.log(selectedPosts, 'selectedPosts');
                            }}></span>)}
                        </span>
                    )}
                    <button
                        className="button-action"
                        type="button"
                        onClick={() => action === 'add' ? addPost(post) : removePost(post)}
                    >
                        {icon}
                    </button>
                </article>
            ))}
        </div>
        </>
    )
}
